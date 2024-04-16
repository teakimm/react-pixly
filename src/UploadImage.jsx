import { useState } from "react";

export default function UploadImage({ showImage }) {
    const [imagePath, setImagePath] = useState(null);


    function handleChange(evt) {
        setImagePath(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        showImage(imagePath);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image">Upload Image:</label>
                <input type="file" id="image" onChange={handleChange} name="image" value={imagePath} />


                <button>Upload</button>
            </form>
        </div>
    );
}