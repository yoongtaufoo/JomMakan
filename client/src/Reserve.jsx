import React, { useState , useEffect , useRef } from 'react'
import "./Reserve.css"
import Navbar from './components/Navbar'
import { Link, useParams } from 'react-router-dom';
import DetailCard from './components/DetailCard';
import {restaurants} from './RestaurantData';
import Form from "./components/Form";
// import { reservations } from './ReservationData';

const Reserve = () => {

    const { id } = useParams();
    const restaurant = restaurants.find( restaurant =>  restaurant.id === parseInt(id));

    function useOutsideAlerter(ref, onClick) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                onClick(); // Close the modal
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, onClick]);
    }

    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const popupRef = useRef(null);

    useOutsideAlerter(popupRef, () => {setConfirm(false); setSubmit(false)});

    return (
    <div>
        <Navbar/>
        <div className='container'>
        {/* <div id='Rmain-container'> */}
            <br />
            <div className='d-flex justify-content-between align-items-center'>
                <Link to={`/restaurant/${id}`} className="back-btn">
                    <i className="bi bi-arrow-left-circle"></i> Back
                </Link>
                <div className="ml-auto">
                    <Link to="/reservations" className='back-btn'>
                        <i className="bi bi-calendar-heart custom-icon"></i>View My Reservations
                    </Link>
                </div>
            </div>
            <div id='Rdown'>
                <div id='card'>
                    {/* restaurant card */}
                    <div id='Fleft'>
                        <DetailCard restaurant={restaurant}/>
                        <div id='disclaimer'>
                            <h3>Reservation Policy</h3>
                            <p>1. Reservation Procedure: Our restaurant accepts reservations through our online reservation form, available on our official website. Reservations can also be made via phone during operating hours.
                            <br/>2. Reservation Changes and Cancellations: Customers may modify or cancel their reservation by contacting the restaurant directly via phone or email. Any changes or cancellations must be made at least 24 hours before the reservation time to avoid penalties.
                            <br/>3. Cancellation Policy: A cancellation policy is in place to manage reservation changes effectively. Customers will be subject to a cancellation fee if they fail to cancel within the specified time</p>
                        </div>
                    </div>
                </div>
                <div id='Rform-container'>
                    <h2>Reservation Form</h2>
                    <Form date={null} tables={restaurant.tables} openinghours={restaurant.openinghours}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Reserve
