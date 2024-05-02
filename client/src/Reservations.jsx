import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./Reservations.css"
import Navbar from './components/Navbar'
import SearchBar from "./components/SearchBar";
import image from "./assets/image 3.png";
import Tabs from './components/Tabs';
// import { reservations } from './ReservationData';
import CollectionCard from './components/CollectionCard';
import axios from "axios";

const Reservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchReservations(); // Fetch reservations when component mounts
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/reservation/getUpcomingReservations"); // Assuming backend endpoint is /api/reservations
      setReservations(response.data); // Update reservations state with fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (activeTab === 0) return reservation.status === "U";
    if (activeTab === 1) return reservation.status === "D";
    if (activeTab === 2) return reservation.status === "C";
    return true; // Default case
  });

  const handleTabClick = (index) => {
    setActiveTab(index); // Update the activeTab state
  };


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
          <i class="bi bi-arrow-left-circle"></i> Back
        </div>
        {/* <SearchBar/> */}

        <h1 className="custom-h1">My Reservations</h1>
        <Tabs
          tabdata={{ one: "Upcoming", two: "Completed", three: "Cancelled" }}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          searchBarPlaceholder={"Restaurants, Name..."}
        />
        
        <br />
        <div className="card mb-3">
          {filteredReservations.map((reservation) => (
            <CollectionCard key={reservation.id} reservations={reservation}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reservations
