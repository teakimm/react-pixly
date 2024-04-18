import { useEffect, useState } from "react";
import PixlyAPI from "./api";
import SearchForm from "./SearchForm";
import ImageCard from "./ImageCard";
import "./Gallery.css";

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
    <div className="Gallery px-5">
      <SearchForm handleSearch={handleSearch} />
      <div className="Gallery-container">
        {images.map((i) => (
          <ImageCard key={i.id} image={i} />
        ))}
      </div>

    </div>
  );
}

export default Gallery;
