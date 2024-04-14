import React, { useState } from 'react';
import './WorkshopCard.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Import solid star icon
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Import regular star icon

const WorkshopCard = ({ workshop }) => {
  const [starred, setStarred] = useState(false);

  const handleStarClick = () => {
    setStarred(!starred);
  };

  return (
    <div className='workshop-card'>
      <img src={workshop.photo} alt='Workshop' className='workshop-img' />
      <h3>{workshop.title}</h3>
      <p>{workshop.description}</p>
      <p>Date and Time: {workshop.dateAndTime}</p>
      <p>Available Slots: {workshop.current} / {workshop.total}</p>
      <div className='button-container'>
        <Link to={`/workshop/${workshop.id}`}><button>Add to Schedule</button></Link>
        <FontAwesomeIcon
          icon={starred ? faStar : farStar}
          className='star-icon'
          onClick={handleStarClick}
        />
      </div>
    </div>
  );
};

export default WorkshopCard;
