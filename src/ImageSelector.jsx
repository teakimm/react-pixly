import { useState } from "react";
import ExifReader from "exifreader";
import { getEXIF } from "./utils";

export default function ImageSelector({ selectImage }) {
    const [imagePath, setImagePath] = useState('');


    function handleChange(evt) {
        setImagePath(evt.target.files[0]);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const tags = await getEXIF(imagePath);
        const urlObject = URL.createObjectURL(imagePath);

        selectImage(imagePath, urlObject, tags);
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image">Upload Image:</label>
                <input type="file" id="image" onChange={handleChange} name="image" files={[imagePath]} />


                <button>Upload</button>
            </form>
        </div>
    );
}