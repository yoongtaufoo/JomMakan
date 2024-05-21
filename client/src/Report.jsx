import React, { useState, useEffect, useRef } from "react";
import "./Report.css";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

import { Link, useParams } from "react-router-dom";
// import { reservations } from './ReservationData';

const Report = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Navbar />

      <div className="report-wrapper d-flex flex-column justify-content-center align-items-center">
        <div className=" report-header d-flex flex-row justify-content-center align-items-center">
          <div className="back report-back ">
            <div
              className="back-btn"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left-circle"></i> Back
            </div>
          </div>
          <h1 className="mb-4">Report & Feedback</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="report-form d-flex flex-column justify-content-center align-items-center"
        >
          <div className="d-flex flex-row">
            <div className="form-check me-4">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onSelect={() => setSelectedValue("flexRadioDefault1")}
                // checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Report
              </label>
            </div>
            <div className="form-check me-4">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onSelect={() => setSelectedValue("flexRadioDefault2")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Feedback
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                onSelect={() => setSelectedValue("flexRadioDefault3")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                Others
              </label>
            </div>
          </div>
          <label htmlFor="report-message">
            <h6 className="report-label">Message</h6>
          </label>
          <textarea
            className="report-textarea"
            name="report-message"
            cols="80"
            rows="6"
            placeholder="Messages"
          ></textarea>

          <label htmlFor="report-suggestion">
            <h6 className="report-label">Suggestions</h6>
          </label>
          <textarea
            className="report-textarea"
            name="report-suggestion"
            cols="80"
            rows="6"
            placeholder="Suggestions"
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Report;
