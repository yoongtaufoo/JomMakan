import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import defaultProfilePic from "../assets/default-pfp.png";
import axios from "axios";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  //Get userId from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  let storedUserId = "";
  if (storedUser) {
    storedUserId = storedUser.user._id;
  }

  useEffect(() => {
    //get token from local storage
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get(`http://localhost:3001/api/profile/${storedUserId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUsername(data.username);
        const profilePicURL = data.profilePic.url;
        if (profilePicURL !== "") setProfilePic(profilePicURL);
      })
      .catch((error) => {
        console.error("Error fetching profile pic:", error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

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
                <strong>{username}</strong>
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
