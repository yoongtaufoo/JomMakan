import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reservations.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import image from "./assets/image 3.png";
import Tabs from "./components/Tabs";
// import { reservations } from './ReservationData';
import CollectionCard from "./components/CollectionCard";
import axios from "axios";

const Reservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    //get username from local storage
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get("http://localhost:3001/api/reservation/myreservations", {
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

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/restaurant/restaurants"
        );
        // const data = await response.json();
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredReservations = reservations.filter((reservation) => {
    const statusFilter = {
      0: "U",
      1: "C",
      2: "D",
    };
    const status = statusFilter[activeTab];
    // console.log(status)
    const query = searchQuery.toLowerCase();
    // if (status === undefined) return true; // Default case

    const restaurant = restaurants.find(
      (rest) => rest._id === reservation.restaurant_id
    );

    const restaurantName = restaurant ? restaurant.name.toLowerCase() : "";
    const restaurantLocation = restaurant
      ? restaurant.location.toLowerCase()
      : "";
    const restaurantAddress = restaurant
      ? restaurant.address.toLowerCase()
      : "";
    const restaurantCuisine = restaurant
      ? restaurant.cuisine.toLowerCase()
      : "";
    if (reservation.status === status) {
      return (
        // (reservation.status === status &&
        reservation.name.toLowerCase().includes(query) ||
        reservation.date.includes(query) ||
        reservation.phone.includes(query) ||
        restaurantName.includes(query) ||
        restaurantLocation.includes(query) ||
        restaurantAddress.includes(query) ||
        restaurantCuisine.includes(query)
      );
    }
  });

  const handleTabClick = (index) => {
    // console.log(index)
    setActiveTab(index); // Update the activeTab state
  };

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
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
          <i className="bi bi-arrow-left-circle"></i> Back
        </div>
        {/* <SearchBar/> */}

        <h1 className="custom-h1">My Reservations</h1>
        <Tabs
          tabdata={{ one: "Upcoming", two: "Completed", three: "Cancelled" }}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          searchBarPlaceholder={"Restaurants, Name..."}
          searchQuery={(query) => setSearchQuery(query)}
          onSearchChange={handleSearchInputChange}
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
};

export default Reservations;
