import React, { useState, useEffect, useRef } from "react";
import "./AddReview.css";
import Navbar from "./components/Navbar";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyDropzone from "./components/MyDropzone";
import axios from "axios";
import Popup from "reactjs-popup";

const AddReview = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const restaurantName = params.get("restaurantName");
  const restaurant_id = _id;
  const popRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [ratingInput, setratingInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [mediaInput, setMediaInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("JomMakanUser");

  // const { edit, selectedReview } = props;

  const handleUploadFile = async (selectedFile) => {
    console.log("Uploading file:", selectedFile);
    setUploadStatus("loading");
    setMediaInput(selectedFile);
    setTimeout(() => {
      setUploadStatus("success");
    }, 3000);
  };

  const resetUploadStatus = () => {
    setUploadStatus("idle");
  };

  const handleRating = (rate) => {
    console.log("Rating:", rate);
    setratingInput(rate);
  };
  // const updateReview = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3001/api/review/${selectedReview.reviewId}`, // Assuming you have a unique identifier for each review (e.g., reviewId)
  //       {
  //         rating: ratingInput,
  //         reviewDescription: descriptionInput,
  //         media: mediaInput,
  //         agreeToTerms: isChecked,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Review updated successfully:", response.data);
  //     // Optionally, you can navigate to another page or perform other actions upon successful review update
  //   } catch (error) {
  //     console.error("Error updating review:", error);
  //     // Handle error scenarios here
  //   }
  // };
  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };
  const resetForm = () => {
    setratingInput(0);
    setDescriptionInput("");
    setMediaInput("");
    setIsChecked(false);
    setUploadStatus("idle");
    window.location.reload();
  };

  const submitReview = async () => {
    // if (edit) {
    //   updateReview();
    // } else {
    if (!ratingInput || !descriptionInput || !mediaInput || !isChecked) {
      alert("Please complete all fields before submitting the review.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/review/${restaurant_id}/addReview`,
        {
          rating: ratingInput,
          timePosted: new Date(),
          reviewDescription: descriptionInput,
          media: mediaInput,
          restaurant_id: restaurant_id,
          agreeToTerms: isChecked,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Review submitted successfully:", response.data);
      resetForm();
    } catch (error) {
      if (error.response) {
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
      //      }
    }
  };

  const handleDescriptionChange = (event) => {
    setDescriptionInput(event.target.value);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //  useEffect(() => {
  //    if (edit && selectedReview) {
  //      setratingInput(selectedReview.rating);
  //      setDescriptionInput(selectedReview.reviewDescription);
  //    }
  //  }, [edit, selectedReview]);

  return (
    <div>
      <div>
        <Navbar />
        <div id="main-container">
          <div className="back">
            <div
              className="back-btn"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <i class="bi bi-arrow-left-circle"></i> Back
            </div>
          </div>
          <div id="form">
            <h2>
              <b>Rate a restaurant</b>
            </h2>
            <p id="desc">
              It only takes a minute! And your review will help other restaurant
              seekers.
            </p>
            <div id="inputs">
              <div id="restaurantName">
                Restaurant Name: <span className="input">{restaurantName}</span>
              </div>
              <br></br>
              <div id="ratings">
                Overall Ratings:
                <br />
                <Rating onClick={handleRating} ratingValue={ratingInput} />
              </div>
              <br></br>
              <div>
                Review:
                <br />
                <textarea
                  className="textArea"
                  rows="4"
                  cols="50"
                  onChange={handleDescriptionChange}
                />
              </div>
              <br></br>
              <div>
                Media Upload:
                <MyDropzone
                  onUploadFile={handleUploadFile}
                  uploadStatus={uploadStatus}
                  resetUploadStatus={resetUploadStatus}
                />
              </div>

              <br></br>
              <div id="checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    handleCheckboxChange(e);
                  }}
                  required
                />
                &nbsp;I agree to the JomMakan Terms of Use and that this review
                is an honest and accurate account of my experience at the
                restaurant.
                <br />
              </div>
            </div>
            <Popup
              contentStyle={{ width: "450px", borderRadius: "20px" }}
              trigger={
                <button id="form-submitButton" onClick={submitReview}>
                  Submit Review
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="popup-overlay">
                  <div className="popup log-out-popup" ref={popRef}>
                    <div id="log-out-popup-title">Confirm</div>
                    <div className="popup-buttons">
                      <button id="cancel-button" onClick={close}>
                        Cancel
                      </button>
                      <button
                        id="yes-button"
                        onClick={() => {
                          submitReview();
                          close();
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
