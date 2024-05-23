import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./assets/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/auth/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code outside the range of 2xx
          alert(err.response.data.Message);
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          alert("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          alert("An error occurred while sending the request.");
        }
      });
  };

  return (
    <>
      <nav className="nav">
        <img className="ms-4 " src={logo} id="logo"></img>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
      </nav>
      <div className="reset-wrapper d-flex flex-column justify-content-center align-items-center">
        <div className=" reset-header d-flex flex-column justify-content-center align-items-center">
          <div className="back reset-back">
            <div
              className="back-btn"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left-circle"></i> Back
            </div>
          </div>
          <h1 className="reset-title">Forgot Password</h1>
        </div>
        <div className="reset-form h-30 d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="needs-validation d-flex flex-column justify-content-center align-items-center"
          >
            <div className="form-group was-validated">
              <label htmlFor="email">
                <h6 className="report-label">Your Email</h6>
              </label>
              <input
                name="email"
                id="email"
                className="form-control auth"
                type="email"
                placeholder="Enter email"
                required
                noValidate
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="mt-4" id="auth-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
