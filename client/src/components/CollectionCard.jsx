// This card can be used for displaying registration or reservation made
import React , { useState , useEffect,useRef } from "react";

const CollectionCard = (props) => {
    let workshops=props.workshop;
    let reservations=props.reservation
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const popRef = useRef(null);
    const handleClickOutside = (event) => {
        if (popRef.current && !popRef.current.contains(event.target)) {
            setConfirm(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Get restaurant data from matching table id of reservation and restaurant
    const getRestaurantImage = () => {
        if (reservation && restaurantData) {
            const matchingRestaurant = restaurantData.find(restaurant => restaurant.tableid.includes(reservation.tableid));
            if (matchingRestaurant) {
                return matchingRestaurant.image;
            }
        }
        return null;
    };

    // Function body
    const renderWorkshop = () => {
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
                        <div>Confirm Cancelation?</div>
                        <div>
                            <button  onClick={() => setSubmit(false)}>No</button>
                            <button  onClick={() => {setConfirm(true); setSubmit(false);}}>Yes</button>
                        </div>
                        </div>
                        </div>
                    }
                    {confirm &&
                        <div id='popup-overlay' ref={popRef}>
                        <div id='popup'>
                        <div>Cancelled</div>
                        </div>
                        </div>
                    }
                </div>
            }
        </div>
        );
    };

    const renderReservation = () => {
        return(
        <div className="row g-0 custom-row">
            <div className="col-md-4">
                <img src={reservation.restaurant.ima} className="img-fluid rounded-start card-img-top" alt="..."/>
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
                        <div>Confirm Cancelation?</div>
                        <div>
                            <button  onClick={() => setSubmit(false)}>No</button>
                            <button  onClick={() => {setConfirm(true); setSubmit(false);}}>Yes</button>
                        </div>
                        </div>
                        </div>
                    }
                    {confirm &&
                        <div id='popup-overlay' ref={popRef}>
                        <div id='popup'>
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
            {workshop ? renderWorkshop() : null}
            {reservation ? renderReservation() : null}
        </div>
    );
}
export default CollectionCard;