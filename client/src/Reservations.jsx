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

  // //get username from local storage
  // const token = localStorage.getItem("JomMakanUser");

  //   // fetchReservations(); // Fetch reservations when component mounts
  //   if (!token) {
  //     alert("User is not authenticated."); // Handle case where user is not authenticated
  //     return;
  //   }
  //   axios
  //     .get("http://localhost:3001/api/reservation/reservations", {
  //       headers: {
  //         Authorization: token // Include JWT in request headers
  //       },
  //     })
  //     .then(({ data }) => {
  //       // console.log("data", data);
  //       setReservations(data);
  //     });

  useEffect(() => {
    //get username from local storage
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get("http://localhost:3001/api/reservation/reservations", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setReservations(data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

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
            <CollectionCard key={reservation._id} reservations={reservation} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reservations
