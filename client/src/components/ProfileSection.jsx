import React, { useState } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/default-pfp.png";
import Popup from "reactjs-popup";

import "./ProfileSection.css";

const ProfileSection = () => {
  const [previewImage, setPreviewImage] = useState(profilePic);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //handle Upload Image
    const data = new FormData();
    data.append("files[]", previewImage);

    fetch(/* server url ,*/ { method: "POST", body: data })
      .then(async (response) => {
        const imageResponse = await response.json();
        setUploadedImage(imageResponse);
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="profile-sec d-flex flex-column justify-content-center align-items-center">
        <div className="profile-edit">
          <img className="profile-pic" src={previewImage} alt="profilePic" />
          <div className="edit">
            <label
              for="file-upload"
              className="custom-file-upload-button"
              id="custom-file-upload-btn"
            >
              <i class="bi bi-pencil-fill edit-icon"></i>
            </label>
            <input
              id="file-upload"
              accept=".png, .jpg, .jpeg"
              type="file"
              onChange={handleSelectImage}
            />
          </div>
        </div>

        {/* {previewImage ? (
          <img
            id="preview-image"
            className="profile-pic"
            src={previewImage}
            alt="preview-image"
          />
        ) : null} */}

        <h1 className="mt-4 mb-5">User123</h1>
        <button
          className="upload-image-btn orange-btn"
          type="submit"
          onSubmit={handleSubmit}
        >
          Update Image
        </button>
        <Popup
          contentStyle={{ width: "450px", borderRadius: "20px" }}
          trigger={
            <button className="log-out-btn">
              <div>
                <strong>Log Out</strong>
              </div>
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="popup-overlay">
              <div className="popup log-put-popup">
                <div id="log-out-popup-title">Log Out</div>
                <div className="popup-buttons">
                  <button id="cancel-button" onClick={close}>
                    Cancel
                  </button>
                  <Link to={"/"}>
                    <button id="yes-button">Yes</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
};

export default ProfileSection;
