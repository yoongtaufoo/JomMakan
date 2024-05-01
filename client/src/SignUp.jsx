import React, { useState, useEffect } from "react";
import "./SignUp.css";
import logo from "./assets/logo.png";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import registerPic from "./assets/register-pic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [pass2, setPass2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/api/auth/register", {
        username,
        location,
        // birthday,
        email, // email from useState
        password: pass, // pass from useState
        password2: pass2,
        // later in auth.controller
        // obj destructuring, must use same name "password"
        // const { username, location, email, password } = req.body;
      })
      .then(() => {
        alert("Registration Successful");
        setUsername("");
        setLocation("");
        // setBirthday("");
        setEmail("");
        setPass("");
        setPass2("");
        // navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log("Unable to register user");
      });
  };

  return (
    <div>
      <nav className="navbar">
        <img className="ms-4" src={logo} id="logo"></img>
      </nav>
      <div className="register-content d-flex flex-row justify-content-center align-items-center">
        <div className="register-container">
          <h1 className="register-header mt-1 mb-3">Register an account</h1>
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
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

            {/* <div class="form-group">
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
            </div> */}

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
                  // noValidate
                  // validated={false}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                {showPassword ? (
                  <i
                    class="bi bi-eye fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-eye-slash fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
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
                  // noValidate
                  // validated={false}
                  // value={pass}
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
                    class="bi bi-eye-slash fs-5 position-absolute me-4 pe-1 mt-1 end-0 top-0"
                    onClick={handleClickShowPassword2}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              <div className="ms-4">
                <PasswordStrengthMeter password={pass2} />
              </div>
            </div>

            <button className="mt-0 mb-8 pt-3 pb-3" type="submit">
              Register
            </button>
          </form>

          <div className="mt-1 mb-1">
            <strong>Already have an account ?</strong>
          </div>
          <a
            class="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            href="/login"
          >
            Click here to log in !
          </a>
        </div>
        <img
          className="register-pic ms-3"
          src={registerPic}
          alt="register-pic"
        />
      </div>
    </div>
  );
};

export default SignUp;
