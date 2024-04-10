import React from "react";
import Navbar from './components/Navbar';
import { Link } from "react-router-dom";

const Workshop = () => {
    return(
        <div>
            <Navbar />
        <Link to ="/wregister">
        <button>Register</button>
        </Link>
        </div>
        
    )
}

export default Workshop;