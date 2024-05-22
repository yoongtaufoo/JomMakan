import React, { useState, useEffect  } from "react";
import "./WorkshopCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {jwtDecode} from "jwt-decode";


const WorkshopCard = ({ workshop }) => {
  const [starred, setStarred] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Extract user ID from JWT token
  const token = localStorage.getItem("JomMakanUser");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    if (userId && workshop.registered) {
      setIsRegistered(workshop.registered.includes(userId));
    }
  }, [userId, workshop.registered]);

  const handleStarClick = () => {
    setStarred(!starred);
  };

  // Add console logs to debug
  console.log("Workshop Data:", workshop);

  return (
    <div key={workshop._id} className="col custom-col">
      <div className="card customized-workshop-card">
        {workshop.photoLink && (
          <img
            src={workshop.photoLink}
            className="card-img-top"
            alt={workshop.workshopName}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{workshop.workshopName}</h5>
          <p className="card-text">{workshop.workshopDescription}</p>
        </div>

        <div>
          {isRegistered ? (
            <button
              type="button"
              className="btn btn-secondary btn-lg custom-add-schedule"
              style={{ backgroundColor: "gray", cursor: "not-allowed" ,width:"70%",marginBottom:"15px"}}
              disabled
            >
              Scheduled
            </button>
          )
          : workshop.availableSlot === 0 ? (
            <button
              type="button"
              className="btn btn-secondary btn-lg custom-add-schedule"
              style={{ backgroundColor: "gray", cursor: "not-allowed",width:"70%" ,marginBottom:"15px"}}
              disabled
            >
              FULL XD
            </button>
          ) 
          : (
            <Link
              to={`/workshop/${workshop._id}`}
              style={{ textDecoration: "none", color: "inherit",width:"70%",marginBottom:"15px" }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-lg custom-add-schedule"
              >
                Add to Schedule
              </button>
            </Link>
          )}
          <FontAwesomeIcon
            icon={starred ? faStar : farStar}
            className="star-icon"
            onClick={handleStarClick}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
