import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";

/** Component for entire page.
 *
 * Props: none
 * State: none
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RouteList/>
        </BrowserRouter>
    </div>
  );
}

export default App;
