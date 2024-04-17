import { getStateByCoord } from "./utils";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/';

class PixlyAPI {
  static async uploadImage(image, exif) {
    const formData = new FormData();
    formData.append('image', image);
    let state;
    if (exif.GPSLatitude) {
      state = getStateByCoord(
        exif.GPSLatitude.description,
        exif.GPSLatitudeRef.description,
        exif.GPSLongitude.description,
        exif.GPSLongitudeRef.description);
    }
    console.log(state);
    formData.append('state', state || null);
    formData.append('fileType', exif.FileType?.value || null);
    formData.append('model', exif.Model?.description || exif.LensModel?.description || null);
    const resp = await fetch(`${BASE_URL}images`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  }
}

export default PixlyAPI;