import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const name = "User123";

  return (
    <div>
      <nav className="navbar">
        <img src={logo} id="logo"></img>
        <div>
          <li>
            <Link to="/home">
              <button id="invisible">Restaurants</button>
            </Link>
          </li>
          <li>
            <Link to="/workshop">
              <button id="invisible">Workshops</button>
            </Link>
          </li>
          <li>
            <button id="invisible">
              <strong>{name}</strong>
            </button>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
