import { useState } from "react";
import { getEXIF } from "./utils";

/** Component for setting image to edit
 *
 * props:
 * - selectImage: parent function
 *
 * state:
 * - imagePath: file storage object
 *
 * ImageUploader -> ImageSelector
 */
function ImageSelector({ selectImage }) {
    const [imagePath, setImagePath] = useState(null);


    function handleChange(evt) {
        setImagePath(evt.target.files[0]);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const exif = await getEXIF(imagePath);
        const objectUrl = URL.createObjectURL(imagePath);

        selectImage(objectUrl, exif);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-50 mx-5 my-5">
                <label htmlFor="image" className="form-label">Select Image:</label>
                <input type="file" id="image" className="form-control" onChange={handleChange} name="image" files={[imagePath]} />

                <button className="btn btn-secondary mt-3" disabled={!imagePath}>Select</button>
            </form>
        </div>
    );
}

export default ImageSelector;