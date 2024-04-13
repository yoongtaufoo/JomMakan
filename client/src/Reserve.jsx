import React, { useState , useEffect , useRef } from 'react'
import "./Reserve.css"
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom';

const Reserve = () => {
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
        <div id='main-container'>
            <div id='up'>
                <button>Back</button>
                
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
                    <div id='warn'>
                        <input type='checkbox'></input>
                        <div>I have read and understood the Reservation Policy of this restaurant</div>
                    </div>
                    <button onClick={() => setSubmit(true)}>Submit</button>
                    {submit &&
                        <div id='popup-overlay'>
                            <div id='popup' ref={popupRef}>
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
                            <div id='popup' ref={popupRef}>
                                <div>Confirmed</div>
                                <Link to='/reservations'>
                                    <button>View My Reservations</button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Reserve
