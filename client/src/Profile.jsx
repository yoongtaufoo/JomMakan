import React, { useState } from "react";
import "./Profile.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import report from "./assets/report.png";
import savedWorkshop from "./assets/saved-workshops.png";
import savedRestaurant from "./assets/saved-restaurant.png";

const userInfo = {
  id: 1,
  username: "User123",
  location: "Kuala Lumpur",
  birthday: "2003-03-25", //retrieve data in yyyy-mm-dd, but shown as mm/dd/yyyy
  email: "abc@gmail.com",
  password: "1234testing1234",
};

const Profile = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState(userInfo.username);
  const [location, setLocation] = useState(userInfo.location);
  const [birthday, setBirthday] = useState(userInfo.birthday);
  const [email, setEmail] = useState(userInfo.email);
  const [pass, setPass] = useState(userInfo.password);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [pass2, setPass2] = useState(userInfo.password);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
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
            <div class="form-group">
              <label htmlFor="username">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                class="form-control auth register"
                name="username"
                id="username"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label htmlFor="location">
                <strong>Location</strong>
              </label>
              <input
                type="text"
                class="form-control auth register"
                name="location"
                id="location"
                placeholder="Enter location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label htmlFor="birthday">
                <strong>Birthday</strong>
              </label>

              <input
                type="date"
                data-date-format="mm/dd/yyyy"
                class="datepicker form-control auth register"
                name="birthday"
                id="birthday"
                placeholder="Enter birthday"
                required
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div class="form-group was-validated">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                class="form-control auth register"
                name="email"
                id="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group position-relative">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <div className="position-relative">
                <input
                  name="password"
                  id="password"
                  class="form-control auth register2"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  noValidate
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                {showPassword ? (
                  <i
                    class="bi bi-eye fs-4 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-eye-slash fs-4 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              <div className="ms-4">
                <PasswordStrengthMeter password={pass} />
              </div>
            </div>

            <div class="form-group position-relative">
              <label htmlFor="retype-password">
                <strong>Retype Password</strong>
              </label>
              <div className="position-relative">
                <input
                  name="retype-password"
                  id="retype-password"
                  class="form-control auth register2"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  noValidate
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                />
                {showPassword2 ? (
                  <i
                    class="bi bi-eye fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword2}
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-eye-slash fs-4 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword2}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              <div className="ms-4">
                <PasswordStrengthMeter password={pass2} />
              </div>
            </div>

            <div>
              {/* <button
                className="prof-cancel-btn mt-0 mb-8 pt-3 pb-3"
                type="button"
              >
                Cancel
              </button> */}
              <button className=" mt-0 mb-8 pt-3 pb-3 orange-btn" type="submit">
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
            <Link to="/report">
              <div className="profile-selections">
                <img className="profile-icons" src={report}></img>
                <strong className="">Report & Feedback</strong>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
