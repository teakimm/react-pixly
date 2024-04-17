const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/';
import cities from "cities";

class PixlyAPI {
  static async uploadImage(image, tags) {
    const formData = new FormData();
    formData.append('image', image);
    const exif = tags;
    console.log(exif.GPSLongitude.description);
    formData.append("exif", JSON.stringify(exif));
    const state = (cities.gps_lookup(exif.GPSLatitude.description, -88)).state;
    console.log(state);
    const resp = await fetch(`${BASE_URL}images`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  }
}

export default PixlyAPI;