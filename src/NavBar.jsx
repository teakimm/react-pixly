import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <Link to='/'>Gallery</Link>
            <Link to='/editor'>Upload an image</Link>
        </div>
    )
}

export default NavBar;