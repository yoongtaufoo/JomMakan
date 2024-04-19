// This card can be used for displaying registration or reservation made
import React , { useState , useEffect,useRef } from "react";
import { restaurants } from "../RestaurantData";

const CollectionCard = ({ workshops, reservations }) => {
    // let workshops=props.workshop;
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const popRef = useRef(null);


    useEffect(() => {
      let handler = (e)=>{
        if(!popRef.current.contains(e.target)){
          setConfirm(false);
        }      
      };
  
      document.addEventListener("mousedown", handler);
      
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });

    const getRestaurantData = (reservations, restaurants) => {
        if (reservations && restaurants) {
            const matchingRestaurant = restaurants.find(restaurant => restaurant.id === reservations.restaurantid);
            return matchingRestaurant;
        }
        return null;
    };

    // Get table for reservation information
    // const getTable = (reservation) => {
    //     for (const restaurant of restaurants) {
    //         const matchingTable = restaurant.tables.find(table => table.id === reservation.tableid);
    //         if (matchingTable) {
    //             return matchingTable; 
    //         }
    //     }
    //     return null;
    // };
    
    // For workshop
    const renderWorkshop = (workshops) => {
    return(
    <div className="row g-0 custom-row">
                <div className="col-md-4">
                    <img src={workshops.image} className="img-fluid rounded-start card-img-top" alt="..."/>
                </div>
                <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title">{workshops.name}</h5>
                        <p className="card-text">{workshops.description}</p>
                        <p className="card-text">
                            <i className='bi-geo-alt-fill custom-icon'></i>
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
            {workshops.Rstatus === 'U' && 
            <div className="col-md-2">
                    <div className="card-body" >
                    <div className="card-body"><button type="button" className="btn btn-outline-dark custom-button" onClick={() => setSubmit(!submit)}>Cancel</button></div>
                    </div>

                    {submit &&
                        <div id='popup-overlay'>
                        <div id='popup'>
                        <div>Confirm Cancellation?</div>
                        <div>
                            <button id="buttonPopupCancel" onClick={() => setSubmit(false)}>No</button>
                            <button  onClick={() => {setConfirm(true); setSubmit(false);}}>Yes</button>
                        </div>
                        </div>
                        </div>
                    }
                    {confirm &&
                        <div id='popup-overlay' >
                        <div id='popup' ref={popRef}>
                        <i class="bi bi-calendar-x-fill"></i>
                        <div>Cancelled</div>
                        </div>
                        </div>
                    }
            </div>
            }
        </div>
    );
    }

    const renderReservation = (reservations) => {
        const restaurantData = getRestaurantData(reservations, restaurants);
        // const tableData = getTable(reservations);
        return (
            <div className="row g-0 custom-row">
                <div className="col-md-4">
                    <img src={restaurantData ? restaurantData.image : ''} className="img-fluid rounded-start card-img-top" alt="..." />
                </div>
                <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title">{restaurantData ? restaurantData.name : ''}</h5>
                        <p className="card-text">{restaurantData ? restaurantData.description : ''}</p>
                        <p className="card-text">
                            <i className='bi-geo-alt-fill custom-icon'></i>
                            {restaurantData ? restaurantData.address : ''}
                        </p>
                        <p className="card-text">
                            <i className="bi bi-telephone-fill custom-icon"></i>
                            {restaurantData ? restaurantData.phone : ''}
                        </p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card-body">
                        <h5 className="card-title">{reservations.date}</h5>
                        <p className="card-text">Name : {reservations.name}</p>
                        <p className="card-text">Phone No: {reservations.phone}</p>
                        <p className="card-text">No. Pax: {reservations.pax}</p>
                        <p className="card-text">Table: {reservations.tableid}</p>
                    </div>
                </div>
                {reservations.status === 'U' &&
                    <div className="col-md-2">
                        <div className="card-body">
                            <div className="card-body">
                                <button type="button" className="btn btn-outline-dark custom-button" onClick={() => setSubmit(!submit)}>Cancel</button>
                            </div>
                        </div>
                        {submit &&
                            <div id='popup-overlay'>
                                <div id='popup'>
                                    <div>Confirm Cancellation?</div>
                                    <div>
                                        <button onClick={() => setSubmit(false)}>No</button>
                                        <button onClick={() => { setConfirm(true); setSubmit(false); }}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        }
                        {confirm &&
                            <div id='popup-overlay' >
                                <div id='popup' ref={popRef}>
                                <i class="bi bi-calendar-x-fill"></i>
                                    <div>Cancelled</div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    };
    
    
    return (
        <div>
            {workshops ? renderWorkshop(workshops) : null}
            {reservations ? renderReservation(reservations) : null}
        </div>
    );
};

export default CollectionCard;