import React from 'react';
import Navbar from './Navbar';
import Tabs from './Tabs';
import WorkshopCard from './WorkshopCard';
import './WorkshopPage.css';
import workshopdetail from '../WorkshopDetails'

//just use workshop detail
// const workshops = [
//   {
//     id: 1,
//     photo: 'workshop1.jpg',
//     title: 'Workshop 1',
//     description: 'Description of Workshop 1',
//     dateAndTime: 'Date and Time for Workshop 1',
//     availableSlots: '20/50',
//   },
//   // Add more workshop objects as needed
// ];

const WorkshopPage = () => {
  // // Generate dummy data for workshops
  // const dummyWorkshops = [];
  // for (let i = 0; i < 6; i++) {
  //   dummyWorkshops.push({
  //     id: i + 1,
  //     photo: `workshop${i + 1}.jpg`,
  //     title: `Workshop ${i + 1}`,
  //     description: `Description of Workshop ${i + 1}`,
  //     dateAndTime: `Date and Time for Workshop ${i + 1}`,
  //     availableSlots: `${Math.floor(Math.random() * 50)}/${Math.floor(Math.random() * 100)}`,
  //   });
  // }

  return (
    <div className="workshop-page">
      <Navbar />
      <div className="title-bar">
        <h1 className="title">Workshops</h1>
        <div className="buttons">
          <button className="button">Favourites</button>
          <button className="button">Schedule</button>
        </div>
      </div>
      <Tabs />
      <div className="workshop-grid">
        {workshopdetail.map(workshop => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
  );
};

export default WorkshopPage;
