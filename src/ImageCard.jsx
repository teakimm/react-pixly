import { Link } from "react-router-dom";
import "./ImageCard.css";
import moment from "moment";

const SECONDS_PER_DAY = 43200;

function ImageCard({ image }) {
  const timeDiff = (new Date() - new Date(image.uploadedAt)) / 1000;
  const relTime = moment(image.uploadedAt).fromNow();
  const time =
    timeDiff > SECONDS_PER_DAY
      ? moment(image.uploadedAt).format("LL")
      : relTime;

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
