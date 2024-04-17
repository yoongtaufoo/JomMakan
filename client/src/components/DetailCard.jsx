import React from "react";

const DetailCard = ({ workshop, restaurant }) => {
  return (
    <div style={{ padding: "10px", display: "block", margin: "5% auto" }}>
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
        {workshop ? `${workshop.current} / ${workshop.total}` : ""}
      </p>
    </div>
  );
};

export default DetailCard;
