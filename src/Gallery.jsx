import { useEffect, useState } from "react";
import PixlyAPI from "./api";
import SearchForm from "./SearchForm";
function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(function fetchPhotosOnMount() {
    async function fetchPhotos() {
      setImages(await PixlyAPI.getImages());
    }
    fetchPhotos();
  }, []);

  async function handleSearch(input) {

  }
  return (
    <div>
      <SearchForm />
      {images.map((i) => (
        <img key={i.id} src={i.url} />
      ))}
    </div>
  );
}

export default Gallery;
