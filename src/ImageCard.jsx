


function ImageCard({ image }) {
    return (
        <div className="card" style={{ width: "15rem" }}>
            <img className="card-img-top" src={image.url} alt={image.name} />
            <div className="card-body">
                <h5 className="card-title">{image.name}</h5>
                <p className="card-text">{image.state ? `Location: ${image.state}` : "No location available"} </p>

                <p className="card-text">Camera: {image.model ? `${image.model}` : "Unknown"} </p>
            </div>
        </div>
    );
}

export default ImageCard;