import React, { useState } from "react";
import Navbar from "./components/Navbar";
import WorkshopCard from "./components/WorkshopCard";
import workshopData from "./WorkshopData";
import image from "./assets/image 3.png";

const FavWorkshop = () => {
  const [favoriteWorkshops, setFavoriteWorkshops] = useState([]);

  // Function to toggle favorite status of a workshop
  const toggleFavorite = (workshopId) => {
    const index = favoriteWorkshops.indexOf(workshopId);
    if (index === -1) {
      // If workshop is not in favorites, add it
      setFavoriteWorkshops([...favoriteWorkshops, workshopId]);
    } else {
      // If workshop is already in favorites, remove it
      const updatedFavorites = [...favoriteWorkshops];
      updatedFavorites.splice(index, 1);
      setFavoriteWorkshops(updatedFavorites);
    }
  };

  // Filter workshops based on favoriteWorkshops array
  const filteredWorkshops = workshopData.filter((workshop) =>
    favoriteWorkshops.includes(workshop.id)
  );

  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <h1 className="customized-h1 workshop-header">Favorite Workshops</h1>
        <div className="workshop-grid">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              toggleFavorite={toggleFavorite}
              isFavorite={true} // Pass a prop to WorkshopCard indicating it's a favorite
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavWorkshop;
