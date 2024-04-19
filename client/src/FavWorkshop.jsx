import React from "react";
import Navbar from "./components/Navbar";
import WorkshopCard from "./components/WorkshopCard";
import workshopData from "./WorkshopData";
import image from "./assets/image 3.png";
import { useNavigate } from "react-router-dom";

const FavWorkshop = () => {
  const navigate = useNavigate();

  // Filter workshops with status "1" (favorites)
  const favoriteWorkshops = workshopData.filter(
    (workshop) => workshop.isFav === 1
  );

  // Limit the display to only 3 favorite workshops
  const limitedWorkshops = favoriteWorkshops.slice(0, 3);

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
          {limitedWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavWorkshop;
