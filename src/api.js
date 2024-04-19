import { getStateByCoord } from "./utils";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/';


/** PixlyAPI Class */
class PixlyAPI {

  /** Given data of an image, append to FormData obj and send to server.  */
  static async uploadImage(image, exif, name) {
    const formData = new FormData();
    formData.append('image', image);
    let location;
    if (exif.GPSLatitude) {
      location = getStateByCoord(
        exif.GPSLatitude.description,
        exif.GPSLatitudeRef.description,
        exif.GPSLongitude.description,
        exif.GPSLongitudeRef.description);
    }

    formData.append('name', name);
    if (location) formData.append('location', location);
    if (exif.FileType?.value) formData.append('fileType', exif.FileType?.value || null);
    if (exif.Model?.description || exif.LensModel?.description) {
      formData.append('model', exif.Model?.description || exif.LensModel?.description || null);
    }

    const resp = await fetch(`${BASE_URL}images`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  }

  /** Takes object {searchTerm: string, category: string.
   * If query object passed in, gets all images filtered by query.
   * If no query object, gets all images.
   */
  static async getImages({ searchTerm, category } = {}) {
    const params = searchTerm && category ? `?${new URLSearchParams({ searchTerm, category })}` : '';
    const response = await fetch(`${BASE_URL}images${params}`);
    const data = await response.json();
    return data.imageData;
  }


}

export default PixlyAPI;