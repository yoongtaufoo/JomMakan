import React, { useState, useEffect, useRef } from "react";
import "./AddReview.css";
import Navbar from "./components/Navbar";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
    const navigate = useNavigate();
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const restaurantName = params.get("restaurantName");

  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setConfirm(false);
    }
  };
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  return (
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
              <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
              />
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
              <input type="file" />
            </div>
            <br></br>
            <div id="checkbox">
              <input type="checkbox" />
              &nbsp;I agree to the JomMakan Terms of Use and that this review is
              an honest and accurate account of my experience at the restaurant.
              <br />
            </div>
          </div>
          <button id="submitButton" onClick={() => setSubmit(!submit)}>
            Submit Review
          </button>
          {submit && (
            <div id="popup-overlay">
              <div id="popup">
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
            <div id="popup-overlay" ref={popRef}>
              <div id="popup">
                <div>Confirmed</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReview;
