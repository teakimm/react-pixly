import { Route, Routes } from "react-router-dom";
import Gallery from "./Gallery";
import ImageUploader from "./ImageUploader";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Gallery/>}/>
      <Route path="/editor" element={<ImageUploader/>}/>
    </Routes>
  );
}

export default RouteList;
