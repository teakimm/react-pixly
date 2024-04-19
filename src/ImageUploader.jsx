import ImageSelector from "./ImageSelector";
import Editor from "./Editor";
import PixlyAPI from "./api";
import { useState } from "react";

/** Component to handle images being uploaded and edited
 *
 * Props: none
 * State:
 * - objectUrl: object to represent an image
 * - exif: object with exif data of image
 *
 *  RoutesList -> ImageUploader
 */
function ImageUploader() {
  const [objectUrl, setObjectUrl] = useState();
  const [exif, setExif] = useState();

  async function selectImage(objUrl, exif) {
    console.log(exif);
    setObjectUrl(objUrl);
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
        <Editor objectUrl={objectUrl} uploadImage={uploadImage} />
      )}
    </div>
  );
}

export default ImageUploader;
