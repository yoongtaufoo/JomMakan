import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import FavWorkshopCard from "./components/FavWorkshopCard";
import axios from "axios";
import image from "./assets/image 3.png";
import { useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import WorkshopCard from "./components/WorkshopCard";

const FavWorkshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /*
  useEffect(() => {
    const fetchSavedWorkshops = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("JomMakanUser")).token;
        if (!token) {
          console.error("No authorization token found");
          return;
        }
  
        const userId = getUserIdFromToken(token); // Extract user ID from token
        console.log("Fetching saved workshops for user:", userId);
  
        // Fetch saved workshops from backend
        const response = await axios.get(`http://localhost:3001/api/workshop/users/${userId}/saved-workshops`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Received saved workshops:", response.data);
        setWorkshops(response.data); // Update state with fetched workshops
      } catch (error) {
        console.error("Error fetching saved workshops:", error);
      }
    };
  
    fetchSavedWorkshops(); // Call the function to fetch saved workshops
  }, []);
  
  */
  
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("JomMakanUser")).token;
        if (!token) {
          console.error("No authorization token found");
          return;
        }

        console.log("Making request with token:", token);
        const response = await axios.get("http://localhost:3001/api/workshop/favworkshops", {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is prefixed with Bearer
          },
        });
        

        console.log("Received response:", response.data);
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };
    fetchWorkshops();
  }, []);
  

  const navigate = useNavigate();

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
        <br />
        <div
          className="back-btn"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left-circle"></i> Back
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="customized-h1 workshop-header">Favourite Workshops</h1>
          <div className="ml-auto">
            <SearchBar
              place="workshops, events, ..."
              onSearch={(query) => setSearchQuery(query)}
            />
          </div>
        </div>
        <br />
        <div className="workshop-grid">
          {filteredWorkshops.map((workshop, index) => (
          <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavWorkshop;
