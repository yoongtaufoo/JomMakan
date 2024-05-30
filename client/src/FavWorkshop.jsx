// FavWorkshop.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WorkshopCard from "./components/WorkshopCard";
import axios from "axios";
import image from "./assets/image 3.png";
import { useNavigate } from "react-router-dom";

const FavWorkshop = () => {
  const navigate = useNavigate();
  const [favoriteWorkshops, setFavoriteWorkshops] = useState([]);

  useEffect(() => {
    const fetchFavoriteWorkshops = async () => {
      try {
        const token = localStorage.getItem("JomMakanUser");
        if (!token) return;

        const response = await axios.get("http://localhost:3001/api/user/favWorkshops", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching favorite workshops:", error);
      }
    };
    fetchFavoriteWorkshops();
  }, []);

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
        <h1 className="customized-h1 workshop-header">Favourite Workshops</h1>
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
