import React from 'react'
import "./Reservations.css"
import Navbar from './components/Navbar'
import SearchBar from "./components/SearchBar";
import image from "./assets/image 3.png";

const Reservations = () => {
  return (
    <div>
      <Navbar/>
      <img src={image} alt="" style={{ width: '100%' }}/>
      <div id='container'>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className='custom-h1'>My Reservations</h1> 
          <SearchBar place="Locations, Restaurant, or Dates..."/>
        </div>
      </div>
    </div>
  )
}

export default Reservations
