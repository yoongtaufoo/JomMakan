import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WorkshopCard from "./components/WorkshopCard";
import axios from "axios";
import image from "./assets/image 3.png";
import { useNavigate } from "react-router-dom";

const FavWorkshop = () => {
  const navigate = useNavigate();
  const [favoriteWorkshops, setUserFavoriteWorkshops] = useState([]);

  useEffect(() => {
    //get username from local storage
    const token = localStorage.getItem("JomMakanUser");

    if(!token){
      alert("User is not authenticated");
      return;
    }
    axios
      .get("http://localhost:3001/api/workshop/favworkshops", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUserFavWorkshops(data);
      })
      .catch((error) => {
        console.error("Error fetching favWorkshops:", error);
      });
  }, []);


  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/workshop/workshops"
        );
        // const data = await response.json();
        setWorkshop(response.data.workshop);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []);

  async function unsaveWorkshop(favWorkshopId) {
    try {
      const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }
      const response = await fetch(`/favworkshops/${favWorkshopId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token // Replace with actual token
        }
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Workshop unsaved successfully', result);
        // Update UI accordingly, e.g., remove the workshop from the list
      } else {
        console.error('Failed to unsave workshop', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [searchQuery, setSearchQuery] = useState("");  
    // Filter restaurants based on search query
    const filteredWorkshops = favWorkshops.filter((workshop) => {
      const { workshopName, workshopDescription, address } = workshop;
      const query = searchQuery.toLowerCase();
      return (
        workshopName.toLowerCase().includes(query) ||
        workshopDescription.toLowerCase().includes(query) ||
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
          {favoriteWorkshops.map((workshop) => (
            <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavWorkshop;
