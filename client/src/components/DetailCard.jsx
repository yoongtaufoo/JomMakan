import React from "react";

const DetailCard = ({ workshop, restaurant }) => {
  
  const getAvailableTables = (restaurant) => {
    if (!restaurant || !restaurant.tables) {
      return 0; // Return 0 if restaurant or tables data is missing
    }
  
    const availableTables = restaurant.tables.filter(table => table.status === "Available");
    return availableTables.length;
  };
  
  return (
    <div style={{ padding: "10px", display: "block", margin: "5% auto" }}>
    {/* // <div className="card customized-workshop-card"> */}
      <img
        src={workshop ? workshop.photo : restaurant.image}
        alt={workshop ? workshop.title : restaurant.name}
        style={{ width: "600px", height: "120%" }}
      />
      <div>
        <h1 className="custom-h1">
          {workshop ? workshop.title : restaurant.name}
        </h1>
      </div>
      <p className="card-text">
        {workshop ? workshop.description : restaurant.description}
      </p>
      <p className="card-text">
        <i className="bi-geo-alt-fill custom-icon"></i>
        {workshop ? workshop.phone : restaurant.phone}
      </p>
      <p className="card-text">
        <i className="bi bi-telephone-fill custom-icon"></i>
        {workshop ? workshop.address : restaurant.address}
      </p>
      <p className="card-text">
        <i className="bi bi-clock-fill custom-icon"></i>
        {workshop ? workshop.dateAndTime : restaurant.openinghours}
      </p>
      <p className="card-text">
        <i className="bi bi-egg-fried custom-icon"></i>
        {workshop ? `${workshop.current} / ${workshop.total}` : `${getAvailableTables(restaurant)} tables available`}
      </p>
    </div>
  );
};

export default DetailCard;
