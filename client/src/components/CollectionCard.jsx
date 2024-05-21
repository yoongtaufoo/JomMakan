// This card can be used for displaying registration or reservation made
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { restaurants } from "../RestaurantData";
import axios from "axios";
const today = new Date(); // Get today's date

const CollectionCard = ({ workshops, reservations }) => {
  // let workshops=props.workshop;
  const [restaurantData, setRestaurantData] = useState(null);
  const [workshopData, setWorkshopData] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const popRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setConfirm(false);
      setSubmit(false);
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
    if (reservations) {
      axios
        .get(
          `http://localhost:3001/api/restaurant/${reservations.restaurant_id}`
        )
        .then(({ data }) => {
          setRestaurantData(data);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    }
  }, [reservations]);

  const cancelReservation = async (reservationId) => {
    const token = localStorage.getItem("JomMakanUser");

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .put(`http://localhost:3001/api/reservation/${reservationId}/cancel`, {
        headers: {
          Authorization: token,
        },
      })
      .catch((error) => {
        alert("Error cancelling reservation:", error);
      });
  };

  const handleCancel = (reservationId) => {
    cancelReservation(reservationId);
  };

  const [tableName, setTableName] = useState(null);

  useEffect(() => {
    if (
      restaurantData &&
      restaurantData.tables &&
      reservations &&
      restaurantData.tables.find(
        // Get tables in restaurant with the same table._id as reservation's table_id
        (table) => table._id === reservations.table_id
      )
    ) {
      const matchedTable = restaurantData.tables.find(
        (table) => table._id === reservations.table_id
      );
      setTableName(matchedTable.name); // Set table name
    }
  }, [reservations, restaurantData]);

  // For workshop
  const renderWorkshop = (workshops) => {
    return (
      <div className="row g-0 custom-row">
        <div className="col-md-4">
          <img
            src={workshops.image}
            className="img-fluid rounded-start card-img-top"
            alt="..."
          />
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <Link to={`/workshop/${workshops.id}`}>
              <h5 className="card-title">{workshops.name}</h5>
            </Link>
            <p className="card-text">{workshops.description}</p>
            <p className="card-text">
              <i className="bi-geo-alt-fill custom-icon"></i>
              {workshops.address}
            </p>
            <p className="card-text">
              <i className="bi bi-telephone-fill custom-icon"></i>
              {workshops.phone}
            </p>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card-body">
            <h5 className="card-title">{workshops.timeslot}</h5>
            <p className="card-text">Name : {workshops.Rname}</p>
            <p className="card-text">Phone No: {workshops.Rphone}</p>
            <p className="card-text">No. Pax: {workshops.Rpax}</p>
          </div>
        </div>
        {workshops.Rstatus === "U" && (
          <div className="col-md-2">
            <div className="card-body">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-outline-dark custom-button"
                  onClick={() => setSubmit(!submit)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {submit && (
          <div className="popup-overlay">
            <div className="popup" ref={popRef}>
              <div>Confirm Cancellation?</div>
              <div>
                <button id="buttonPopupCancel" onClick={() => setSubmit(false)}>
                  No
                </button>
                <button
                  onClick={() => {
                    setConfirm(true);
                    setSubmit(false);
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
              <div>Cancelled</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReservation = (reservations) => {
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
            <Link to={`/restaurant/${restaurantData.id}`}>
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
        <div className="col-md-2">
          <div className="card-body">
            <h5 className="card-title">{reservations.date.slice(0, 10)}</h5>
            <p className="card-text">
              Time: {reservations.timestart} - {reservations.timeend}
            </p>
            <p className="card-text">Name : {reservations.name}</p>
            <p className="card-text">Phone No: {reservations.phone}</p>
            <p className="card-text">No. Pax: {reservations.pax}</p>
            <p className="card-text">Table: {tableName}</p>
          </div>
        </div>
        {reservations.status === "U" && (
          <div className="col-md-2">
            <div className="card-body">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-outline-dark custom-button"
                  onClick={() => setSubmit(!submit)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {submit && (
          <div className="popup-overlay">
            <div className="popup" ref={popRef}>
              <div>Confirm Cancellation?</div>
              <div>
                <button id="buttonPopupCancel" onClick={() => setSubmit(false)}>
                  No
                </button>
                <button
                  onClick={() => {
                    setConfirm(true);
                    setSubmit(false);
                    handleCancel(reservations._id);
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
              <div>Cancelled</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {workshops ? renderWorkshop(workshops) : null}
      {reservations && restaurantData ? renderReservation(reservations) : null}
    </div>
  );
};

export default CollectionCard;
