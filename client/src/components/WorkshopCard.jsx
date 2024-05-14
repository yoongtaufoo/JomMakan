import React, { useState } from "react";
import "./WorkshopCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const WorkshopCard = ({ workshop }) => {
  const [starred, setStarred] = useState(false);

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
          <Link
            to={`/workshop/${workshop._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-lg custom-add-schedule"
            >
              Add to Schedule
            </button>
          </Link>
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
