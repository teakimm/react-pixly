import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import ImageSelector from "./ImageSelector";
import Editor from "./Editor";
import PixlyAPI from "./api";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

function App() {
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
    <div className="App">
      {!imagePath ? (
        <ImageSelector selectImage={selectImage} />
      ) : (
        <Editor imagePath={imagePath} uploadImage={uploadImage} />
      )}
    </div>
  );
}

export default App;
