import React, { useState } from "react";
import "./WorkshopCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Import solid star icon
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"; // Import regular star icon

const WorkshopCard = ({ workshop }) => {
  const [starred, setStarred] = useState(false);

  const handleStarClick = () => {
    setStarred(!starred);
  };

  return (
    <>
      <div key={workshop.id} className="col custom-col">
        <div className="card customized-workshop-card">
          <img
            src={workshop.photo}
            className="card-img-top"
            alt={workshop.name}
          />
          <div className="card-body">
            <h5 className="card-title">{workshop.title}</h5>
            <p className="card-text">{workshop.description}</p>
          </div>

          <div>
            <Link
              to={`/workshop/${workshop.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button
                type="button"
                class="btn btn-secondary btn-lg custom-add-schedule"
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
    </>
  );
};

export default WorkshopCard;