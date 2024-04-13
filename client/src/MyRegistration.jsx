import react from "react";
import Navbar from './components/Navbar';
import image from "./assets/image 3.png";
import Tabs from"./components/Tabs.jsx";
import { Link} from 'react-router-dom';

const MyRegistration = () => {
    // Function body
    return(
        <div>
            <Navbar/>
            <img src={image} alt="" style={{ width: '100%' }} />
            <div className="container">
                <div style={{marginTop:'30px', marginBottom:'30px'}}>
                <Link to="/workshop">
                 <small>Discover Workshop</small>
                </Link>
                </div>
            
                <h1 className='custom-h1'>My Schedule</h1>
        </div>
        <Tabs tabdata={{"one":"Upcoming","two":"Completed","three":"Cancelled"}}/>

        </div>
        
    )
};

export default MyRegistration;