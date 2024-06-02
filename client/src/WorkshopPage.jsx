import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import image from "./assets/image 3.png";
import WorkshopCard from "./components/WorkshopCard";
import axios from "axios";
import "./WorkshopPage.css";
import SearchBar from "./components/SearchBar";

const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(workshops)
  useEffect(() => {
    //get userid from local storage
    const token = localStorage.getItem("JomMakanUser");
    if (!token) {
      alert("User is not authenticated.");
      return;
    }
    
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/workshop/workshops");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter((workshop) => {
    const { workshopName, workshopDescription } = workshop;
    const query = searchQuery.toLowerCase();
    return (
      workshopName.toLowerCase().includes(query) ||
      workshopDescription.toLowerCase().includes(query)
    );
  });
  

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
        <div className="d-flex justify-content-end align-items-center">
          <div>
            <SearchBar 
              place="Workshops, Events..." 
              onSearch={(query) => setSearchQuery(query)}
            />
          </div>
        </div>
        <br />
        <div className="workshop-grid">
          {filteredWorkshops.map((workshop, index) => (
            <WorkshopCard key={index} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workshop;
