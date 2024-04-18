import { Link } from "react-router-dom";
import './ImageCard.css'

function ImageCard({ image }) {
  return (
    <a target="_blank" href={image.url} className="ImageCard card m-3" style={{ width: "18rem" }}>
      <img className="card-img-top" src={image.url} alt={image.name} />
      <div className="card-body">
        <h5 className="card-title">{image.name}</h5>
        <p className="card-text">
          {image.location ? `Location: ${image.location}` : "No location available"}
        </p>

        <p className="card-text">
          Camera: {image.model ? `${image.model}` : "Unknown"}
        </p>
      </div>
    </a>
  );
}

export default ImageCard;
