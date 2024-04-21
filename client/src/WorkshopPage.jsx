import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import WorkshopCard from "./components/WorkshopCard";
import "./WorkshopPage.css";
import workshopData from "./WorkshopData";
import { Link } from "react-router-dom";
import image from "./assets/image 3.png";

const WorkshopPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  
  const filteredWorkshops = workshopData.filter((workshop) => {
    if (activeTab === 0) return workshop;
    if (activeTab === 1) return workshop.isFresh === 1;
    return true; 
  });

  const handleTabClick = (index) => {
    setActiveTab(index); 
  };

  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="customized-h1 workshop-header">Discover Workshops</h1>
          <div className="ml-auto">
            <a href="/fav-workshop">
              <small className="back-btn">
                <i className="bi bi-heart-fill custom-icon"></i>Favourites
              </small>
            </a>
            <a href="/schedule">
              <small className="back-btn">
                <i className="bi bi-calendar-heart custom-icon"></i>My Workshops
              </small>
            </a>
          </div>
        </div>

        <Tabs
          tabdata={{
            one: "All",
            two: "Fresh Additions",
          }}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          searchBarPlaceholder={"Workshops, Events..."}
        />
        <div className="workshop-grid">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;
