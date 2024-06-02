import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/default-pfp.png";
import Popup from "reactjs-popup";
import axios from "axios";
import { AuthContext } from ".././context/AuthContext";
import "./ProfileSection.css";

const ProfileSection = () => {
  const [username, setUsername] = useState("");
  const [previewImage, setPreviewImage] = useState(profilePic);

  //Get userId from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  let storedUserId = "";
  if (storedUser) {
    storedUserId = storedUser.user._id;
  }

  useEffect(() => {
    //get token from local storage
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get(`http://localhost:3001/api/profile/${storedUserId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUsername(data.username);
        const profilePicURL = data.profilePic.url;
        if (profilePicURL !== "") setPreviewImage(profilePicURL);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

  // Profile Pic

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 2MB in bytes

    if (file.size > maxSize) {
      alert("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from local storage
      const token = localStorage.getItem("JomMakanUser");

      if (!token) {
        alert("User is not authenticated.");
        return;
      }
      const { data } = await axios.put(
        `http://localhost:3001/api/profile/profile-pic/${storedUserId}`,
        {
          image: previewImage,
        }
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        //   withCredentials: true, // Include credentials with the request
        // }
      );
      if (data.success === true) {
        alert("Update successfully");
        window.location.reload(); // reload window after update successfully
      }
      // console.log(data);
    } catch (error) {
      if (error.response && error.response.status === 413) {
        alert("Payload too large. Please upload a smaller file.");
      } else {
        console.error("Error updating profile pic:", error);
      }
    }
  };

  // Log Out
  const navigate = useNavigate();

  const { updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      updateUser(null);
      alert("Log out successful");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="profile-sec d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="profile-edit">
            <img className="profile-pic" src={previewImage} alt="profilePic" />
            <div className="edit">
              <label
                htmlFor="file-upload"
                className="custom-file-upload-button"
                id="custom-file-upload-btn"
              >
                <i className="bi bi-pencil-fill edit-icon"></i>
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

          <h1 className="mt-4 mb-5">{username}</h1>
          <button className="upload-image-btn orange-btn" type="submit">
            Update Image
          </button>
        </form>

        <Popup
          contentStyle={{ width: "450px", borderRadius: "20px" }}
          trigger={
            <button className="log-out-btn">
              <div>Log Out</div>
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
                  <button id="yes-button" onClick={handleLogout}>
                    Yes
                  </button>
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
