import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import profilePic from "../assets/default-pfp.png";

const Navbar = () => {
  // default name
  let name = "User123";

  //get username from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  if (storedUser) {
    console.log(storedUser);
    name = storedUser.user.username;
  }

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
              <div
                id="invisible"
                className="d-flex align-items-center align-self-center"
              >
                <strong>{name}</strong>
                <img id="nav-pfp" src={profilePic} alt="nav profile pic"></img>
              </div>
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
