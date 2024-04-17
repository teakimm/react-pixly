const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/';

class PixlyAPI {
  static async uploadImage(image, tags) {
    const formData = new FormData();
    formData.append('image', image);
    console.log(image);
    const resp = await fetch(`${BASE_URL}images`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  }
}

export default PixlyAPI;