import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Reservations.css"
import Navbar from './components/Navbar'
import SearchBar from "./components/SearchBar";
import image from "./assets/image 3.png";
import Tabs from './components/Tabs';
import { reservations } from './ReservationData';
import CollectionCard from './components/CollectionCard';

const Reservations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

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
      <Navbar/>
      <img src={image} alt="" style={{ width: '100%' }}/>
      <div className='container'>
        <br/>
        <div className='back-btn' style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <i class="bi bi-arrow-left-circle"></i> Back  
        </div>
        
        <h1 className='custom-h1'>My Reservations</h1> 
        <Tabs
          tabdata={{ one: "Upcoming", two: "Completed", three: "Cancelled" }}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <br />
        <div className="card mb-3">
          {filteredReservations.map((reservation) => (
            <CollectionCard key={reservation.id} reservations={reservation} />
            // <CollectionCard key={reservation.id} workshop={registration} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reservations
