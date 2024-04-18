import ImageSelector from "./ImageSelector";
import Editor from "./Editor";
import PixlyAPI from "./api";
import { useState } from "react";

/** Component for entire page.
 *
 * Props: none
 * State: none
 */

function ImageUploader() {
  const [imagePath, setImagePath] = useState();
  const [exif, setExif] = useState();

  async function selectImage(urlObject, exif) {
    setImagePath(urlObject);
    setExif(exif);
  }

  async function uploadImage(image, name) {
    await PixlyAPI.uploadImage(image, exif, name);
  }

  return (
    <div className="ImageUploader">
      {!imagePath ? (
        <ImageSelector selectImage={selectImage} />
      ) : (
        <Editor imagePath={imagePath} uploadImage={uploadImage} />
      )}
    </div>
  );
}

export default ImageUploader;
