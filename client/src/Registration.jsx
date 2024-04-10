import React , { useState , useEffect,useRef } from "react";
import Navbar from './components/Navbar'
import "./Reservation.css";
import Form from "./components/Form";


const Registration = () => {
       const date ="12-5pm, 05-05-2024 ";
        return (
        <div>
            <Navbar/>
            <div id='main-container'>
                <div id='up'>
                    <button>Back</button>
                    <button>View My Reservations</button>
                </div>
                <div id='down'>
                    <div id='left'>
                        {/* restaurant card */}
                        <div id='disclaimer'>
                            <h3>Registration Policy</h3>
                            <p>1. Registration Procedure: Our workshop accepts registration through our online registration form, available on our official website. Registration can also be made via phone during operating hours.
                            <br/>2. Registration Changes and Cancellations: Customers may modify or cancel their registration by contacting the restaurant directly via phone or email. Any changes or cancellations must be made at least 24 hours before the registration time to avoid penalties.
                            <br/>3. Cancellation Policy: A cancellation policy is in place to manage registration changes effectively. Customers will be subject to a cancellation fee if they fail to cancel within the specified time</p>
                        </div>
                    </div>
                    <div id="form-container">
                        <h2>RESERVATION FORM</h2>
                        <Form date={date}/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Registration;