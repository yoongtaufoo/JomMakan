import React from "react";

const FavWorkshopCard = ({ workshop }) => {
  const {
    workshopName,
    workshopDescription,
    phoneNumber,
    address,
    time,
    date,
    availableSlot,
    photoLink,
  } = workshop;

  return (
    <div className="card">
      <img src={photoLink || "default-image-url"} alt={workshopName} />
      <div className="card-body">
        <h5 className="card-title">{workshopName}</h5>
        <p className="card-text">{workshopDescription}</p>
        <p className="card-text"><small>{new Date(date).toLocaleDateString()}</small></p>
        <p className="card-text">Time: {time}</p>
        <p className="card-text">Slots: {availableSlot}</p>
        <p className="card-text">Phone: {phoneNumber}</p>
        <p className="card-text">Address: {address}</p>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default FavWorkshopCard;
