import { useState } from "react";

export default function ImageSelector({ selectImage }) {
    const [imagePath, setImagePath] = useState('');


    function handleChange(evt) {
        setImagePath(evt.target.files);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log(imagePath[0]);
        const urlObject = URL.createObjectURL(imagePath[0]);


        selectImage(urlObject);
        // URL.revokeObjectURL(urlObject);
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