import { useState } from "react";
import { getEXIF } from "./utils";

export default function ImageSelector({ selectImage }) {
    const [imagePath, setImagePath] = useState('');


    function handleChange(evt) {
        setImagePath(evt.target.files[0]);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const exif = await getEXIF(imagePath);
        const urlObject = URL.createObjectURL(imagePath);

        selectImage(urlObject, exif);
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="w-50 mx-5 my-5">
                <label htmlFor="image" className="form-label">Select Image:</label>
                <input type="file" id="image" className="form-control" onChange={handleChange} name="image" files={[imagePath]} />


                <button className="btn btn-secondary mt-3">Select</button>
            </form>
        </div>
    );
}