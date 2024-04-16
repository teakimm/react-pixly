import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import ImageSelector from "./ImageSelector";
import Editor from "./Editor";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

function App() {
  const [imagePath, setImagePath] = useState();

  function selectImage(data) {
    console.log(data)
    setImagePath(data);
  }

  return (
    <div className="App">
      {!imagePath ? (
        <ImageSelector selectImage={selectImage} />
      ) : (
        <Editor imagePath={imagePath} />
      )}
    </div>
  );
}

export default App;
