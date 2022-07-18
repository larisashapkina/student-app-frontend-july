import React, {useState} from 'react';
import'./Navbar.scss';
import { Link } from "react-router-dom";

function NavBar() {

    const [showNavbarItems, setShowNavbarItems] = useState(false);
    return (
        <div className="navbar">
            <div className="navbar__logo">Student App</div>
            <div className="navbar__menuItems">
                <li className="navbar__menuItem">
                    <Link to="/">Students</Link></li>
                <li className="navbar__menuItem">
                    <Link to="/about">About</Link></li>
                <li className="navbar__menuItem">
                    <Link to="/contact">Contact</Link></li>
            </div>
            <div className="navbar__toggleIcon">=</div>
        </div>
    );
}

export default NavBar;