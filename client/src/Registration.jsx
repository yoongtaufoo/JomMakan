import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import "./Reserve.css";
import Form from "./components/Form";
import { Link, useParams } from "react-router-dom";
import WorkshopDetails from "./WorkshopDetails";
import DetailCard from "./components/DetailCard";

const Registration = () => {
  const { id } = useParams();
  const workshop = WorkshopDetails.find(
    (workshop) => workshop.id === parseInt(id)
  );
  return (
    <div>
      <Navbar />
      <div id="Rmain-container">
        <br />
        <div id="up">
          <Link to="/workshop">
            <b>
              <small>
                <i class="bi bi-arrow-left-circle"></i> Back
              </small>
            </b>
          </Link>
          <div className="ml-auto">
            <Link to="/schedule">
              <b>
                <small className="text-muted">
                  <i className="bi bi-calendar-heart custom-icon"></i>View My
                  Schedule
                </small>
              </b>
            </Link>
          </div>
        </div>
        <div id="Rdown">
          <div id="Fleft">
            <DetailCard workshop={workshop} />
            <div id="disclaimer">
              <h3>Registration Policy</h3>
              <p>
                1. Registration Procedure: Our workshop accepts registration
                through our online registration form, available on our official
                website. Registration can also be made via phone during
                operating hours.
                <br />
                2. Registration Changes and Cancellations: Customers may modify
                or cancel their registration by contacting the organizer
                directly via phone or email (cancellation can be done via thi
                website) . Any changes or cancellations must be made at least 24
                hours before the registration time to avoid penalties.
                <br />
                3. Cancellation Policy: A cancellation policy is in place to
                manage registration changes effectively. Customers will be
                subject to a cancellation fee if they fail to cancel within the
                specified time
                <br />
              </p>
            </div>
          </div>
          <div id="Rform-container">
            <h2 id="form-header">Registration Form</h2>
            <Form date={workshop.dateAndTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
