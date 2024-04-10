import React from 'react';
import './WorkshopCard.css';

const WorkshopCard = ({ workshop }) => {
  return (
    <div className='workshop-card'>
      <img src={workshop.photo} alt='Workshop' className='workshop-img' />
      <h3>{workshop.title}</h3>
      <p>{workshop.description}</p>
      <p>Date and Time: {workshop.dateAndTime}</p>
      <p>Available Slots: {workshop.availableSlots}</p>
      <button>Add to Schedule</button>
      <button>Star</button>
    </div>
  );
};

export default WorkshopCard;
