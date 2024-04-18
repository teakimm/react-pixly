import { useEffect, useState } from "react";
import PixlyAPI from "./api";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(function fetchPhotosOnMount() {
    async function fetchPhotos() {
      setImages(await PixlyAPI.getImages());
    }
    fetchPhotos();
  }, []);

  console.log(images[0]);

  return (
    <div>
      {images.map((i) => (
        <img key={i.id} src={i.url} />
      ))}
    </div>
  );
}

export default Gallery;
