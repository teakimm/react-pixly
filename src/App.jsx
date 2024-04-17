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

  async function selectImage(image, urlObject, tags) {
    setImagePath(urlObject);
    // await PixlyAPI.uploadImage(image, tags);
  }

  async function uploadImage(image, tags) {
    await PixlyAPI.uploadImage(image, tags);
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
