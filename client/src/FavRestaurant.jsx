import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
// import res1 from "./assets/Restaurant1.jpg";
// import res2 from "./assets/Restaurant2.jpg";
// import res3 from "./assets/Restaurant3.jpg";
// import res4 from "./assets/Restaurant4.jpg";
// import res5 from "./assets/Restaurant5.jpg";
// import res6 from "./assets/Restaurant6.jpg";
import image from "./assets/image 3.png";
import SearchBar from "./components/SearchBar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import "./FavRestaurant.css";
import FavRestaurantCard from "./components/FavRestaurantCard";



const FavRestaurant = () => {
  const navigate = useNavigate();

  const [favRestaurants, setUserFavRestaurants] = useState([]);

  useEffect(() => {
    //get username from local storage
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get("http://localhost:3001/api/restaurant/favrestaurants", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUserFavRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching favRestaurants:", error);
      });
  }, []);


  const [restaurants, setRestaurants] = useState([]);

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




  async function unsaveRestaurant(favRestaurantId) {
    try {
      const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }
      const response = await fetch(`/favrestaurants/${favRestaurantId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token // Replace with actual token
        }
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Restaurant unsaved successfully', result);
        // Update UI accordingly, e.g., remove the restaurant from the list
      } else {
        console.error('Failed to unsave restaurant', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [searchQuery, setSearchQuery] = useState("");  
    // Filter restaurants based on search query
    const filteredRestaurants = favRestaurants.filter((restaurant) => {
      const { name, location, cuisine, address } = restaurant;
      const query = searchQuery.toLowerCase();
      return (
        name.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        cuisine.toLowerCase().includes(query) ||
        address.toLowerCase().includes(query)
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
          <h1 className="custom-h1">Favourite Restaurants</h1>
          <div className="ml-auto">
          <SearchBar 
              place="Locations, Restaurant, or Cuisines..." 
              onSearch={(query) => setSearchQuery(query)}
            />
          </div>
        </div>
        <br />
        <div className="card mb-3">
          {filteredRestaurants.map((restaurant) => (
            <FavRestaurantCard key={restaurant._id} favrestaurants={restaurant} unsaveRestaurant={unsaveRestaurant} />
            // <div className="row g-0 custom-row">
            //   <div className="col-md-4">
            //     <img
            //       src={restaurant.image}
            //       className="img-fluid rounded-start card-img-top"
            //       alt="..."
            //     />
            //   </div>
            //   <div className="col-md-8">
            //     <div className="card-body">
            //       <Link to={`/restaurant/${restaurant._id}`}> 
            //         <h5 className="card-title">{restaurant.name}</h5>
            //       </Link>
            //       <p className="card-text">{restaurant.description}</p>
            //       <p className="card-text">
            //         <i className="bi-geo-alt-fill custom-icon"></i>
            //         {restaurant.phone}
            //       </p>
            //       <p className="card-text">
            //         <i className="bi bi-telephone-fill custom-icon"></i>
            //         {restaurant.address}
            //       </p>
            //       <p className="card-text">
            //         <i className="bi bi-clock-fill custom-icon"></i>
            //         {restaurant.openinghours}
            //       </p>
            //       <button
            //         type="button"
            //         className="btn btn-outline-dark custom-button"
            //       >
            //         Unsaved
            //       </button>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavRestaurant;
