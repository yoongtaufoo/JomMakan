
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { restaurants } from "../RestaurantData";
import axios from "axios";

const FavRestaurantCard = ({ favrestaurants }) => {
  
  const [restaurantData, setRestaurantData] = useState(null);

  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popRef.current && !popRef.current.contains(event.target)) {
        setConfirm(false);
        setSubmit(false);
        window.location.reload();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  // Get restaurants that user reserved
  useEffect(() => {
    if (favrestaurants) {
      axios
        .get(
          `http://localhost:3001/api/restaurant/${favrestaurants.restaurant_id}`
        )
        .then(({ data }) => {
          setRestaurantData(data.restaurant);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    }
  }, [favrestaurants]);


// unsaveRestaurant function should only handle API calls
const unsaveRestaurant = async (favRestaurantId) => {
    try {
      const token = localStorage.getItem("JomMakanUser");
      if (!token) {
        alert("User is not authenticated.");
        return;
      }
  
      const response = await axios.delete(`http://localhost:3001/api/restaurant/favrestaurants/${favRestaurantId}`, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        // If the request is successful, update the UI to reflect the changes
        setFavRestaurants(prevFavRestaurants =>
          prevFavRestaurants.filter(restaurant => restaurant._id !== favRestaurantId)
        );
        setConfirm(true); // Set confirm to true to show success message
      } else {
        // If the request fails, show an error message
        console.error("Failed to unsave restaurant");
        // Optionally, you can set an error state to display an error message to the user
      }
    } catch (error) {
      console.error("Error unsaving restaurant:", error);
      // Handle errors here, such as displaying an error message to the user
    }
  };
  
  // handleCancel function should call unsaveRestaurant asynchronously
  const handleCancel = async (favRestaurantId) => {
    try {
      const unsaved = await unsaveRestaurant(favRestaurantId);
      if (unsaved) {
        // If unsaving was successful, update the UI accordingly
        // For example, update the list of favorite restaurants in state
        // and handle the confirmation UI state
        setRestaurantData(prevFavRestaurants =>
          prevFavRestaurants.filter(restaurant => restaurant._id !== favRestaurantId)
        );
        setConfirm(true);
      }
    } catch (error) {
      // Handle error, such as showing an error message to the user
      console.error("Error handling cancellation:", error);
    }
  };




  const renderFavourites = (favrestaurants) => {
    // const restaurantData = getRestaurantData(reservations, restaurants);
    return (
      <div className="row g-0 custom-row">
        <div className="col-md-4">
          <img
            src={restaurantData.image}
            className="img-fluid rounded-start card-img-top"
            alt="..."
          />
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <Link to={`/restaurant/${restaurantData._id}`}>
              <h5 className="card-title">{restaurantData.name}</h5>
            </Link>
            <p className="card-text">{restaurantData.description}</p>
            <p className="card-text">
              <i className="bi-geo-alt-fill custom-icon"></i>
              {restaurantData.address}
            </p>
            <p className="card-text">
              <i className="bi bi-telephone-fill custom-icon"></i>
              {restaurantData.phone}
            </p>
          </div>
        </div>
        
        {favrestaurants.status === "S" && (
          <div className="col-md-2">
            <div className="card-body">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-outline-dark custom-button"
                  onClick={() => setSubmit(!submit)}
                >
                  Unsave
                </button>
              </div>
            </div>
          </div>
        )}
        {submit && (
          <div className="popup-overlay">
            <div className="popup" ref={popRef}>
              <div>Confirm Unsave?</div>
              <div>
                <button id="buttonPopupCancel" onClick={() => {
                    setSubmit(false)
                    handleCancel(favrestaurants._id); } } >
                  No
                </button>
                <button
                  onClick={() => {
                    setConfirm(true);
                    setSubmit(false);
                    handleCancel(favrestaurants._id);
                    window.location.reload();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
        {confirm && (
          <div className="popup-overlay">
            <div className="popup" ref={popRef}>
              <i className="bi bi-calendar-x-fill"></i>
              <div>Unsaved</div>
            </div>
          </div>
        )}
      </div>
    );
  };

    return (
        <div>
        
        {favrestaurants&&restaurantData ? renderFavourites(favrestaurants) : null}
        </div>
    );
};

export default FavRestaurantCard;
