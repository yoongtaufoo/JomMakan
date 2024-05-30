import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import image from "./assets/image 3.png";
import SearchBar from "./components/SearchBar";
import "./Home.css";
import axios from "axios"


const Home = () => {

  const[restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/restaurant/restaurants");
        // const data = await response.json();
        setRestaurants(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
    
  }, [])

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const { name, location, cuisine } = restaurant;
    const query = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(query) ||
      location.toLowerCase().includes(query) ||
      cuisine.toLowerCase().includes(query)
    );
  });
  


  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="customized-h1">Discover Restaurants</h1>
          <div className="ml-auto ">
            <Link to="/fav-restaurant">
              <small className="back-btn">
                <i className="bi bi-heart-fill custom-icon"></i>Favourites
              </small>
            </Link>
            <Link to="/reservations">
              <small className="back-btn">
                <i className="bi bi-calendar-heart custom-icon"></i>My
                Reservations
              </small>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <div>
            <SearchBar
              place="Locations, Restaurant, or Cuisines..."
              onSearch={(query) => setSearchQuery(query)}
            />
          </div>
        </div>
        <br />
        <div className="restaurants-list row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className="col custom-col">
              <Link
                to={`/restaurant/${restaurant._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card customized-restaurant-card">
                  <img
                    src={restaurant.image}
                    className="card-img-top"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">{restaurant.description}</p>
                  </div>
                  <div className="card-footer custom-card-footer d-flex justify-content-between">
                    <small className="text-muted">
                      <i className="bi-geo-alt-fill custom-icon"></i>
                      <span className="custom-card-text">
                        {restaurant.location}
                      </span>
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-star-half custom-icon"></i>
                      <span className="custom-card-text">
                        Review:
                        {restaurant.averageRating.toFixed(1)}                      </span>
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
