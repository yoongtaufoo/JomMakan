import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
// import report from "./assets/report.png";
import passwordIcon from "./assets/password.png";
import savedWorkshop from "./assets/saved-workshops.png";
import savedRestaurant from "./assets/saved-restaurant.png";
import axios from "axios";

const Profile = () => {
  // Get userid from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  let storedUserId = "";
  let token = "";
  if (storedUser) {
    storedUserId = storedUser.user._id;
    token = storedUser.token;
  }

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

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
        setLocation(data.location);
        setEmail(data.email);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("JomMakanUser");

    const userProfile = {
      username,
      location,
      // birthday,
      email,
      // password: pass,
    };

    axios
      .put(`http://localhost:3001/api/profile/${storedUserId}`, userProfile, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        alert("Update successfully");
        window.location.reload(); // reload window after update successfully
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="profile-wrapper d-flex flex-row justify-content-center">
        <div>
          <ProfileSection />
        </div>
        <div className="profile-details-wrapper d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="profile-card ps-4 needs-validation"
            id="auth-form"
          >
            <div className="form-group">
              <label htmlFor="username">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                className="form-control auth register"
                name="username"
                id="username"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                <strong>Location</strong>
              </label>
              <input
                type="text"
                className="form-control auth register"
                name="location"
                id="location"
                placeholder="Enter location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group was-validated">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <div className="form-control auth register">{email}</div>
            </div>

            <div>
              <button className=" mt-4 mb-8 pt-3 pb-3 orange-btn" type="submit">
                Update
              </button>
            </div>
          </form>
          <div className="profile-selections-wrapper d-flex flex-row">
            <Link to="/fav-restaurant">
              <div className="profile-selections">
                <img className="profile-icons" src={savedRestaurant}></img>
                <div>
                  <strong>Favourite Restaurants</strong>
                </div>
              </div>
            </Link>
            <Link to="/fav-workshop">
              <div className="profile-selections">
                <img className="profile-icons" src={savedWorkshop}></img>
                <strong>
                  <div>Favourite Workshops</div>
                </strong>
              </div>
            </Link>
            <Link to={`/reset-password`}>
              <div className="profile-selections">
                <img className="profile-icons" src={passwordIcon}></img>
                <strong>
                  <div>Reset Password</div>
                </strong>
              </div>
            </Link>
          </div>
          {/* <Link to="/report">
            <div className="d-flex flex-row justify-content-center mt-5">
              <img id="report-icon" src={report}></img>
              <strong className="">Report & Feedback</strong>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
