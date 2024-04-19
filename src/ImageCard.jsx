import { Link } from "react-router-dom";
import "./ImageCard.css";
import { formatTime } from "./utils";

/** Component to render individual image cards
 *
 * props:
 * - image: object like: {url, uploadedAt, location, model, name}
 *
 * state: none
 *
 * Gallery -> ImageCard
 *
 */
function ImageCard({ image }) {
  const time = formatTime(image.uploadedAt)

  return (
    <a
      target="_blank"
      href={image.url}
      className="ImageCard card m-3"
      style={{ width: "18rem" }}
    >
      <img className="card-img-top" src={image.url} alt={image.name} />
      <div className="card-body font-weight-light">
        <h5 className="card-title mb-3">{image.name}</h5>
        <div className="card-text">
          {image.location
            ? `Location: ${image.location}`
            : "No location available"}
        </div>

        <div className="card-text">
          Camera: {image.model ? `${image.model}` : "Unknown"}
        </div>

        <div className="card-text">{time}</div>
      </div>
    </a>
  );
}

export default ImageCard;
