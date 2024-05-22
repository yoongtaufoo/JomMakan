import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./ResetPassword.css";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import { AuthContext } from "./context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

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

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      updateUser(null);
      //alert("Log out successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
    let userId = "";
    let token = "";
    if (storedUser) {
      userId = storedUser.user._id;
      token = storedUser.token;
    }

    axios
      .put(`http://localhost:3001/api/auth/reset-password`, {
        token,
        userId,
        currentPassword: pass,
        newPassword: pass2,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Reset password successfully");
          handleLogout();
        } else {
          alert(res.data.Status);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="reset-wrapper d-flex flex-column justify-content-center align-items-center">
        <div className=" reset-header d-flex flex-row justify-content-center align-items-center">
          <div className="back reset-back">
            <Link to="/profile">
              <div
                className="back-btn"
                style={{ cursor: "pointer" }}
                //   onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left-circle"></i> Back
              </div>
            </Link>
          </div>
        </div>
        <h1 className="reset-title">Reset Password</h1>
        <div className="reset-form-wrapper d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="reset-form d-flex flex-column justify-content-center align-items-center"
          >
            <div className="mb-3 d-flex flex-row">
              <div className="form-check me-4">
                <div className="form-group position-relative">
                  <label htmlFor="oldpassword">
                    <h6 className="report-label">Current Password</h6>
                  </label>
                  <input
                    name="oldpassword"
                    id="oldpassword"
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
                      className="bi bi-eye-slash reset-eye fs-5 position-absolute me-4 pe-1 end-0 top-0"
                      onClick={handleClickShowPassword}
                      style={{ cursor: "pointer" }}
                    ></i>
                  )}
                </div>
                <div className="ms-4">
                  <PasswordStrengthMeter password={pass} />
                </div>
                <div className="form-group position-relative">
                  <label htmlFor="password">
                    <h6 className="report-label">New Password</h6>
                  </label>
                  <input
                    name="password"
                    id="password"
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
                      className="bi bi-eye reset-eye fs-5 position-absolute me-4 pe-1  end-0 top-0"
                      onClick={handleClickShowPassword2}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash reset-eye fs-5 position-absolute me-4 pe-1  end-0 top-0"
                      onClick={handleClickShowPassword2}
                      style={{ cursor: "pointer" }}
                    ></i>
                  )}
                </div>
                <div className="ms-4">
                  <PasswordStrengthMeter password={pass2} />
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

export default ResetPassword;
