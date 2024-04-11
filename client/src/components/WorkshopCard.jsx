import React from 'react';
import './WorkshopCard.css';
import { Link } from "react-router-dom";

const WorkshopCard = ({ workshop }) => { // Remove key from props
  return (
    <div className='workshop-card'>
      <img src={workshop.photo} alt='Workshop' id='workshop-img' />
      <h3>{workshop.title}</h3>
      <p>{workshop.description}</p>
      <p>Date and Time: {workshop.dateAndTime}</p>
      <p>Available Slots: {workshop.current} / {workshop.total}</p>
      <Link to={`/workshop/${workshop.id}`}><button>Add to Schedule</button></Link> {/* Use workshop.id */}
      <button>Star</button>
    </div>
  );
};

export default WorkshopCard;
