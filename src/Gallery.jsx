import { useEffect, useState } from "react";
import PixlyAPI from "./api";
import SearchForm from "./SearchForm";
function Gallery() {
  const [images, setImages] = useState([]);
  console.log(images);

  useEffect(function fetchPhotosOnMount() {
    async function fetchPhotos() {
      setImages(await PixlyAPI.getImages());
    }
    fetchPhotos();
  }, []);

  async function handleSearch(query) {
    setImages(await PixlyAPI.getImages(query));
  }
  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      {images.map((i) => (
        <img key={i.id} src={i.url} />
      ))}
    </div>
  );
}

export default Gallery;
