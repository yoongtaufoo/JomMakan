import React from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/default-pfp.png";
import "./ProfileSection.css";

const ProfileSection = () => {
  return (
    <>
      <div className="profile-sec d-flex flex-column justify-content-center align-items-center">
        <div className="profile-edit">
          <img className="profile-pic" src={profilePic} alt="profilePic" />
          <div className="edit">
            <button className="edit-button" type="button">
              <i class="bi bi-pencil-fill edit-icon"></i>
            </button>
          </div>
        </div>
        <h1 className="mt-4 mb-5">User123</h1>
        <Link to={"/"}>
          <button className="log-out-btn">
            <div className="log-out-font">Log Out</div>
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProfileSection;
