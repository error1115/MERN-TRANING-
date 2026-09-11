import {Link, NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav>
        
                <h2> Student Task Manager</h2>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
            </div>
        </nav>
    );
}
export default Navbar;