import React from "react";
// import { get } from "../../../server/routes/reservation.route";

const DetailCard = ({ workshop, restaurant }) => {
  
  const getMinMaxTableCapacity = (restaurant) => {
    if (!restaurant || !restaurant.tables) {
      return 0; // Return 0 if restaurant or tables data is missing
    }

    const tables = restaurant.tables;
    // Initialize min and max capacity with the first table's capacity
    let minCapacity = tables[0].pax;
    let maxCapacity = tables[0].pax;

    // Iterate through the tables to find the minimum and maximum capacities
    for (let i = 1; i < tables.length; i++) {
      const tableCapacity = tables[i].pax;
      if (tableCapacity < minCapacity) {
        minCapacity = tableCapacity;
      }
      if (tableCapacity > maxCapacity) {
        maxCapacity = tableCapacity;
      }
    }

    return { minCapacity, maxCapacity };
  };

  const { minCapacity, maxCapacity } = getMinMaxTableCapacity(restaurant);
  
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
        {workshop ? `${workshop.current} / ${workshop.total}` : `Table capacity: ${minCapacity} to ${maxCapacity}`}
      </p>
    </div>
  );
};

export default DetailCard;
