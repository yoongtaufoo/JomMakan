import React from 'react'
import "./Navbar.css"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <img src={logo} id='logo'></img>
        <li>
          <Link to="/home">
            <button id='invisible'>Home</button>
          </Link>
        </li>
        <li>
        <button id='invisible'>Something</button>
        </li>
        <li>
        <button id='invisible'>Something</button>
        </li>
      </nav>
    </div>
  )
}

export default Navbar
