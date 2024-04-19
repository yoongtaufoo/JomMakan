import React, { useState } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/default-pfp.png";
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
        <Link to={"/"}>
          <button className="log-out-btn">
            <div>Log Out</div>
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProfileSection;
