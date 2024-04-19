import { Route, Routes } from "react-router-dom";
import Gallery from "./Gallery";
import ImageUploader from "./ImageUploader";

/** Component for Routes.
 *
 * props: none
 *
 * state: none
 *
 * App -> RouteList
 */
function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Gallery/>}/>
      <Route path="/editor" element={<ImageUploader/>}/>
    </Routes>
  );
}

export default RouteList;
