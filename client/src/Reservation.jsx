import React from 'react'
import "./Reservation.css"
import Navbar from './components/Navbar'

const Reservation = () => {
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
                        <p>Reservation Procedure: Our restaurant accepts reservations through our online reservation form, available on our official website. Reservations can also be made via phone during operating hours.
Reservation Changes and Cancellations: Customers may modify or cancel their reservation by contacting the restaurant directly via phone or email. Any changes or cancellations must be made at least 24 hours before the reservation time to avoid penalties.
Cancellation Policy: A cancellation policy is in place to manage reservation changes effectively. Customers will be subject to a cancellation fee if they fail to cancel within the specified time</p>
                    </div>
                </div>
                <div id='form'>
                    <h2>RESERVATION FORM</h2>
                    <div id=''>Date:<input id='input'></input></div>
                    <div>Name:<input id='input'></input></div>
                    <div>Phone No:<input id='input'></input></div>
                    <div>Time:<input id='input'></input></div>
                    <div>No of pax:<input id='input'></input></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reservation
