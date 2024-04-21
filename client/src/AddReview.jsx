import React, { useState, useEffect, useRef } from "react";
import "./AddReview.css";
import Navbar from "./components/Navbar";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyDropzone from "./components/MyDropzone";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const restaurantName = params.get("restaurantName");

  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const handleUploadFile = async (selectedFile) => {
    console.log("Uploading file:", selectedFile);
    setUploadStatus("loading");
    setTimeout(() => {
      setUploadStatus("success");
    }, 3000);
  };

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setConfirm(false);
      setSubmit(false);
    }
  };

  const resetUploadStatus = () => {
    setUploadStatus("idle");
  };

  const handleRating = (rate) => {
    console.log("Rating:", rate);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!popRef.current.contains(e.target)) {
  //       setConfirm(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

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
              <Rating onClick={handleRating} />
            </div>
            <br></br>
            <div>
              Review:
              <br />
              <textarea className="textArea" rows="4" cols="50" />
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
              <input type="checkbox" />
              &nbsp;I agree to the JomMakan Terms of Use and that this review is
              an honest and accurate account of my experience at the restaurant.
              <br />
            </div>
          </div>
          <button id="form-submitButton" onClick={() => setSubmit(!submit)}>
            Submit Review
          </button>
          {submit && (
            <div id="popup-overlay">
              <div id="popup" ref={popRef}>
                <div>Confirm submit?</div>
                <div>
                  <button
                    onClick={() => {
                      setConfirm(true);
                      setSubmit(false);
                    }}
                  >
                    Confirm
                  </button>
                  <button onClick={() => setSubmit(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          {confirm && (
            <div id="popup-overlay" >
              <div id="popup" ref={popRef}>
                <div>Confirmed</div>
              </div>
            </div>
          )}
        </div>
        
      </div>
      
    </div>
    
    </div>
  );
};

export default AddReview;
