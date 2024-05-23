import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import logo from "./assets/logo.png";

const ResetPassword2 = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/auth/reset-password/${id}/${token}`, {
        password: pass,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          navigate("/login");
        } else {
          alert(res.data.Message); // Handle any other response status
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.Message) {
          alert(err.response.data.Message);
        } else {
          alert("An error occurred. Please try again.");
        }
        console.log(err);
      });
  };

  return (
    <>
      <nav className="navbar">
        <img className="ms-4" src={logo} id="logo"></img>
      </nav>
      <div className="reset-wrapper d-flex flex-column justify-content-center align-items-center">
        <h1 className="reset-title">Reset Password</h1>
        <div className="reset-form-wrapper d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="reset-form d-flex flex-column justify-content-center align-items-center"
          >
            <div className="mb-3 d-flex flex-row">
              <div className="form-check me-4">
                <div className="form-group position-relative">
                  <label htmlFor="password">
                    <h6 className="report-label">New Password</h6>
                  </label>
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
                      className="bi bi-eye reset-eye fs-5 position-absolute me-4 pe-1  end-0 top-0"
                      onClick={handleClickShowPassword}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash reset-eye fs-5 position-absolute me-4 pe-1  end-0 top-0"
                      onClick={handleClickShowPassword}
                      style={{ cursor: "pointer" }}
                    ></i>
                  )}
                </div>
                <div className="ms-4">
                  <PasswordStrengthMeter password={pass} />
                </div>
              </div>
            </div>
            <button type="submit" className="mt-0">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword2;
