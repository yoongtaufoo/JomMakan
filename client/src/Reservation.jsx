import React, { useState } from 'react'
import "./Reservation.css"
import Navbar from './components/Navbar'

const Reservation = () => {
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);

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
                        <h3>Reservation Policy</h3>
                        <p>1. Reservation Procedure: Our restaurant accepts reservations through our online reservation form, available on our official website. Reservations can also be made via phone during operating hours.
                        <br/>2. Reservation Changes and Cancellations: Customers may modify or cancel their reservation by contacting the restaurant directly via phone or email. Any changes or cancellations must be made at least 24 hours before the reservation time to avoid penalties.
                        <br/>3. Cancellation Policy: A cancellation policy is in place to manage reservation changes effectively. Customers will be subject to a cancellation fee if they fail to cancel within the specified time</p>
                    </div>
                </div>
                <div id='form'>
                    <h2>RESERVATION FORM</h2>
                    <div id='inputs'>
                        <div>Date:<br/><input id='input' type='datetime-local'></input></div>
                        <div>Name:<br/><input id='input'></input></div>
                        <div>Phone No:<br/><input id='input' type='tel'></input></div>
                        <div>No of pax:<br/><input id='input' type='number'></input></div>
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
                        <div id='popup-overlay'>
                            <div id='popup'>
                                <div>Confirmed</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Reservation
