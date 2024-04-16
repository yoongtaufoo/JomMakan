import React from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import loginLeft from "./assets/log-in-left.jpg";
import loginRight from "./assets/log-in-right.jpg";

const LogIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} id="logo"></img>
        {/* <Link to="/login">
          <button>Login</button>
        </Link> */}
      </nav>
      <div class="w-100 d-flex flex-row justify-content-between align-items-center">
        <img
          className="log-in-pic pic-left"
          src={loginLeft}
          alt="left log in pic"
        />
        <div className="log-in-container">
          <h1>Log in to your account</h1>
          <form onSubmit={handleSubmit} id="log-in-form">
            <div class="form-group">
              <label for="emailLogIn">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                class="form-control log-in"
                id="emailLogIn"
                // aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
            </div>
            <div class="form-group">
              <label for="passwordLogIn">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                class="form-control log-in"
                id="passwordLogIn"
                placeholder="Enter Password"
              />
            </div>
            <Link to="/home">
              <button type="submit" id="log-in-button">
                Log In
              </button>
            </Link>
            <br />
            <p>
              <strong>Don't have an account ?</strong>
            </p>
            <a
              class="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="/signup"
            >
              Click here to sign up !
            </a>
            {/* <label htmlFor="">Email Address: </label>
        <br></br>
        <input
          type="email"
          placeholder="--Enter your email address--"
          className="input-Box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
            {/* <button type="submit">Log In</button> */}
          </form>
        </div>
        <img className="log-in-pic" src={loginRight} alt="right log in pic" />
      </div>
    </div>
  );
};

export default LogIn;
