import { getStateByCoord } from "./utils";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/';

class PixlyAPI {
  static async uploadImage(image, exif, name) {
    const formData = new FormData();
    formData.append('image', image); //TODO: i have no idea how this is working but you can name it here, can prob add an input to rename
    let state;
    if (exif.GPSLatitude) {
      state = getStateByCoord(
        exif.GPSLatitude.description,
        exif.GPSLatitudeRef.description,
        exif.GPSLongitude.description,
        exif.GPSLongitudeRef.description);
    }
    formData.append('name', name);
    if (state) formData.append('state', state);
    if (exif.FileType?.value) formData.append('fileType', exif.FileType?.value || null);
    if (exif.Model?.description || exif.LensModel?.description) formData.append('model', exif.Model?.description || exif.LensModel?.description || null);

    const resp = await fetch(`${BASE_URL}images`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  }


  static async getImages({searchTerm, category} = {}) {
    const params = searchTerm && category ? `?${new URLSearchParams({searchTerm, category})}` : '';
    const response = await fetch(`${BASE_URL}images${params}`);
    const data =  await response.json();
    return data.imageData;
  }


}

export default PixlyAPI;