import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import profilePic from "../assets/default-pfp.png";

const Navbar = () => {
  const name = "User123";

  return (
    <div>
      <nav className="navbar">
        <img className="ms-4" src={logo} id="logo"></img>
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
            <Link to="/profile">
              <button id="invisible">
                <strong>{name}</strong>
              </button>
              <img id="nav-pfp" src={profilePic} alt="nav profile pic"></img>
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
