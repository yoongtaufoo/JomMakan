import React from "react";

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
  const getDateTime = (workshop) => {
    if (!workshop || !workshop.date ) return "";
    const dateOnly = workshop.date.split('T')[0];
    const date = new Date(dateOnly);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}` + " @ " + workshop.time;
  };
  const { minCapacity, maxCapacity } = getMinMaxTableCapacity(restaurant);

  return (
    <div style={{ padding: "10px", display: "block", margin: "5% auto" }}>
      <img
        src={workshop ? workshop.photoLink : restaurant.image}
        alt={workshop ? workshop.workshopName : restaurant.name}
        style={{ width: "600px", height: "100%" }}
      />
      <div>
        <h1 className="custom-h1">
          {workshop ? workshop.workshopName : restaurant.name}
        </h1>
      </div>
      <p className="card-text">
        {workshop ? workshop.workshopDescription : restaurant.description}
      </p>
      <p className="card-text">
        <i className="bi bi-telephone-fill custom-icon"></i>
        {workshop ? workshop.phoneNumber : restaurant.phone}
      </p>
      <p className="card-text">
        <i className="bi-geo-alt-fill custom-icon"></i>
        {workshop ? workshop.address : restaurant.address}
      </p>
      <p className="card-text">
        <i className="bi bi-clock-fill custom-icon"></i>
        {workshop ? getDateTime(workshop) : restaurant.openinghours}
      </p>
      <p className="card-text">
        <i className="bi bi-egg-fried custom-icon"></i>
        {workshop ? `Available slots: ${workshop.availableSlot}` : `Table capacity: ${minCapacity} to ${maxCapacity}`}
      </p>
    </div>
  );
};

export default DetailCard;
