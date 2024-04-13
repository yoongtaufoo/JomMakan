import React, { useState , useEffect,useRef } from 'react'
import "./Reservation.css"
import Navbar from './components/Navbar'
import workshopPic from "./assets/workshop.png";
import DetailCard from './components/DetailCard';
import { Link } from 'react-router-dom';

import Form from "./components/Form";

const Reservation = () => {
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

    return (
    <div>
        <Navbar/>
        <div id='Rmain-container'>
        <br />
            <div id='up'>
                {/* <button>Back</button>
                <button>View My Reservations</button> */}
                <Link to="/workshop">
                <b> <small><i class="bi bi-arrow-left-circle"></i> Back</small></b>
                        </Link>
                    <div className="ml-auto">
                        <Link to="/schedule">
                         <b><small className="text-muted"><i className="bi bi-calendar-heart custom-icon"></i>View My Schedule</small></b>
                         </Link>
                    </div>
            </div>
            <div id='Rdown'>
                <div id='Fleft'>
                <DetailCard workshop={{id:15, photo:workshopPic,title:"Hello",description:"Hello",phone:"123",address:"123",dateAndTime:"123"}}/>
                    {/* restaurant card */}
                    <div id='disclaimer'>
                        <h3>Reservation Policy</h3>
                        <p>1. Reservation Procedure: Our restaurant accepts reservations through our online reservation form, available on our official website. Reservations can also be made via phone during operating hours.
                        <br/>2. Reservation Changes and Cancellations: Customers may modify or cancel their reservation by contacting the restaurant directly via phone or email. Any changes or cancellations must be made at least 24 hours before the reservation time to avoid penalties.
                        <br/>3. Cancellation Policy: A cancellation policy is in place to manage reservation changes effectively. Customers will be subject to a cancellation fee if they fail to cancel within the specified time</p>
                    </div>
                </div>
                <div id="Rform-container">
                <h2 id="form-header">RESERVATION FORM</h2>
                <Form date={null}/>
                {/* <div id='Rform'>
                    <div id='Rinputs'>
                        <div>Date:<br/><input id='Rinput' type='datetime-local'></input></div>
                        <div>Name:<br/><input id='Rinput'></input></div>
                        <div>Phone No:<br/><input id='Rinput' type='tel'></input></div>
                        <div>No of pax:<br/><input id='Rinput' type='number'></input></div>
                    </div>
                    <button onClick={() => setSubmit(!submit)}>Submit</button>
                    {submit &&
                        <div id='popup-overlay'>
                            <div id='popup'>
                                <div>Confirm reservation?</div>
                                <div>
                                    <button  onClick={() => setSubmit(false)}>Wait</button>
                                    <button  onClick={() => {setConfirm(true); setSubmit(false);}}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    }
                    {confirm &&
                        <div id='popup-overlay' ref={popRef}>
                            <div id='popup'>
                                <div>Confirmed</div>
                            </div>
                        </div>
                    }
                </div> */}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Reservation
