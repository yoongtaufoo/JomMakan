import React from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import WorkshopCard from "./WorkshopCard";
import "./WorkshopPage.css";
import workshopdetail from "../WorkshopDetails";
import { Link } from "react-router-dom";
import image from "../assets/image 3.png";

const WorkshopPage = () => {
  const workshops = [
    {
      id: 1,
      photo: "workshop1.jpg",
      title: "Workshop 1",
      description: "Description of Workshop 1",
      dateAndTime: "Date and Time for Workshop 1",
      availableSlots: "20/50",
    },
    // Add more workshop objects as needed
  ];

  // Generate dummy data for workshops
  const dummyWorkshops = [];
  for (let i = 1; i < 6; i++) {
    dummyWorkshops.push({
      id: i + 1,
      photo: `workshop${i + 1}.jpg`,
      title: `Workshop ${i + 1}`,
      description: `Description of Workshop ${i + 1}`,
      dateAndTime: `Date and Time for Workshop ${i + 1}`,
      availableSlots: `${Math.floor(Math.random() * 50)}/${Math.floor(
        Math.random() * 100
      )}`,
    });
  }

  return (

    // <div className="workshop-page">
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="customized-h1 workshop-header">Workshops</h1>
        <div className="ml-auto">
          <a href="/FavRestaurant">
            <small className="back-btn">
              <i className="bi bi-heart-fill custom-icon"></i>Favourites
            </small>
          </a>
          <a href="/schedule">
            <small className="back-btn">
              <i className="bi bi-calendar-heart custom-icon"></i>My Workshop
            </small>
          </a>
        </div>
      </div>

      <Tabs
        tabdata={{
          one: "Top Picks",
          two: "Recently Viewed",
          three: "Fresh Additions",
        }}
        searchBarPlaceholder={"Workshops, Events..."}
      />
      <div className="workshop-grid">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
        {dummyWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default WorkshopPage;
