import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import loginLeft from "./assets/log-in-left.jpg";
import loginRight from "./assets/log-in-right.jpg";
import logo from "./assets/logo.png";

const LogIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <nav className="navbar">
        <img className="ms-4" src={logo} id="logo"></img>
      </nav>
      <div class="login-wrapper w-100 d-flex flex-row justify-content-between align-items-center">
        <img
          className="log-in-pic pic-left"
          src={loginLeft}
          alt="left log in pic"
        />
        <div className="auth-container">
          <h1>Log in to your account</h1>
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
            id="auth-form"
          >
            <div class="form-group was-validated">
              <label htmlFor="emailLogIn">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                class="form-control auth"
                name="emailLogIn"
                id="emailLogIn"
                // aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class="form-group position-relative">
              <label htmlFor="passwordLogin">
                <strong>Password</strong>
              </label>
              <div className="position-relative">
                <input
                  name="passwordLogin"
                  id="passwordLogin"
                  class="form-control auth"
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
                    class="bi bi-eye fs-4 position-absolute me-4 pe-1 mt-2 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-eye-slash fs-4 position-absolute me-4 pe-1 mt-2 end-0 top-0"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              {/* <PasswordStrengthMeter password={pass} /> */}
            </div>

            <button type="submit" id="auth-button">
              Log In
            </button>
          </form>
          <br />

          <div>
            <strong>Don't have an account ?</strong>
          </div>
          <a
            class="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            href="/signup"
          >
            Click here to sign up !
          </a>
        </div>
        <img className="log-in-pic" src={loginRight} alt="right log in pic" />
      </div>
    </div>
  );
};

export default LogIn;
