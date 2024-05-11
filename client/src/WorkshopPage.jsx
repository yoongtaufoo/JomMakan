import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import WorkshopCard from "./components/WorkshopCard";
import "./WorkshopPage.css";

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch("/api/workshop");
        if (!response.ok) {
          throw new Error(`Error fetching workshops: ${response.statusText}`);
        }
        const data = await response.json();
        // Extract only Workshop Name and Description
        const extractedWorkshops = data.data.map((workshop) => ({
          id: workshop._id,
          title: workshop.workshopName,
          description: workshop.workshopDescription,
        }));
        setWorkshops(extractedWorkshops);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWorkshops();
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Navbar />
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
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;
