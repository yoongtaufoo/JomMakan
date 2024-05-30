import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import report from "./assets/report.png";
import passwordIcon from "./assets/password.png";
import savedWorkshop from "./assets/saved-workshops.png";
import savedRestaurant from "./assets/saved-restaurant.png";
import axios from "axios";

const Profile = () => {
  // axios.defaults.withCredentials = true;

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
  // const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  // const [pass, setPass] = useState(userInfo.password);
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };
  // const [pass2, setPass2] = useState(userInfo.password);
  // const [showPassword2, setShowPassword2] = useState(false);
  // const handleClickShowPassword2 = () => {
  //   setShowPassword2(!showPassword2);
  // };

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
        <div className="mt-5">
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

            {/* <div className="form-group">
              <label htmlFor="birthday">
                <strong>Birthday</strong>
              </label>

              <input
                type="date"
                data-date-format="mm/dd/yyyy"
                className="datepicker form-control auth register"
                name="birthday"
                id="birthday"
                placeholder="Enter birthday"
                required
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div> */}

            <div className="form-group was-validated">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              {/* <input
                type="email"
                className="form-control auth register"
                name="email"
                id="email"
                placeholder="Enter email"
                required
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // readOnly
              /> */}
              <div className="form-control auth register">{email}</div>
            </div>

            {/* <div className="form-group position-relative">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <div className="position-relative">
                <input
                  name="password"
                  id="password"
                  className="form-control auth register2"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  noValidate
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                {showPassword ? (
                  <i
                    className="bi bi-eye fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye-slash fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              <div className="ms-4">
                <PasswordStrengthMeter password={pass} />
              </div>
            </div>

            <div className="form-group position-relative">
              <label htmlFor="retype-password">
                <strong>Retype Password</strong>
              </label>
              <div className="position-relative">
                <input
                  name="retype-password"
                  id="retype-password"
                  className="form-control auth register2"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  noValidate
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                />
                {showPassword2 ? (
                  <i
                    className="bi bi-eye fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword2}
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye-slash fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword2}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              <div className="ms-4">
                <PasswordStrengthMeter password={pass2} />
              </div>
            </div> */}

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
