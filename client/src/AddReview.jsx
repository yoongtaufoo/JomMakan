import React, { useState, useEffect, useRef } from "react";
import "./AddReview.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

const AddReview = () => {
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setConfirm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div id="main-container">
        <div className="back">
          <Link to="/home">
            <small>Back</small>
          </Link>
          <Link to="/home">
            <small>Back to Restaurant</small>
          </Link>
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
              Restaurant Name:
              <input className="input" type="text" />
            </div>
            <div id="ratings">
              Overall Ratings:
              <br />
              <select className="input">
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
            </div>
            <div>
              Review:
              <br />
              <textarea className="textArea" rows="4" cols="50" />
            </div>
            <div>
              Media Upload:
              <input type="file" />
            </div>
            <div id="checkbox">
              <input type="checkbox" />
              I agree to the JomMakan Terms of Use and that this review is an
              honest and accurate account of my experience at the restaurant.
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
