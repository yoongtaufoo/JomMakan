import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "react-router-dom";
import "./App.css";
import drip from "./assets/drip.png";
import gif from "./assets/eggif.gif";
import logo from "./assets/logo.png";

function App() {
  // this is the landing page
  return (
    <div>
      <div className="landing-wrapper">
      <nav className="navbar">
        <img className="ms-4" src={logo} id="logo"></img>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
      </nav>
      <Parallax pages={2.8} className="parallax-wrapper">
        <ParallaxLayer offset={1} speed={1} 
          sticky={{start: 0, end: 0.03}}
        >
          <div id="first-view">
            <img src={drip} id="drip"></img>
            <div id="tagline">
              <strong>
              Scrambling for Flavor? We Have You Covered!
              </strong>
            </div>
            <img src={gif} id="gif"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.3} speed={0.3}>
          <div id="second-view">
            <div id="tagline">Discover Restaurants!</div>
            <div>
              Deciding where to eat has never been easier! Get daily, fresh
              recommendations to try out hidden gems or well-loved neighbourhood
              eateries operated by local entrepreneurs.{" "}
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.95} speed={0.5}>
          <div id="second-view">
            <div>
              Make restaurant reservations without a hassle! JomMakan provides online restaurant reservation services with zero-charge cancellation fee!
            </div>
            <div id="tagline">Streamline Restaurant Reservations!</div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2.1} speed={0.7}>
          <div id="second-view">
            <div id="tagline">Discover Workshops and Events!</div>
            <div>
              Get notified about workshops and events happening in restaurants around you! Easily register through our online registration.
            </div>
          </div>
        </ParallaxLayer>
      
      </Parallax>
      </div>
    </div>
  );
}

export default App;
