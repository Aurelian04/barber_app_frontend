import { NavLink } from "react-router"


function Navbar() {
    return(
        <nav>
            My Salon

            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar