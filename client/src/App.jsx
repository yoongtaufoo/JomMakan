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
          <ParallaxLayer
            offset={1}
            speed={0.05}
            sticky={{ start: 0, end: 0.1 }}
          >
            <div id="first-view">
              <img src={drip} id="drip"></img>
              <div id="tagline1">
                <h1>Scrambling for Flavor? We Have You Covered!</h1>
              </div>
              <img src={gif} id="gif"></img>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.3} speed={0.8}>
            <div id="left-view" className="container mt-5 ">
              <div className="row w-50">
                <div id="tagline">
                  <h1>DISCOVER LOCAL RESTAURANTS</h1>
                </div>
                <div>
                  Deciding where to eat has never been easier! Get daily, fresh
                  recommendations to try out hidden gems or well-loved
                  neighborhood eateries operated by local entrepreneurs.
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.95} speed={0.5}>
            <div id="right-view" className="container mt-5 ">
              <div className="row w-50">
                <div id="tagline">
                  <h1>ONLINE RESTAURANT RESERVATION!</h1>
                </div>
                <div>
                  Make restaurant reservations without a hassle! JomMakan
                  provides online restaurant reservation services with
                  zero-charge cancellation fee!
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={2.1} speed={0.7}>
            <div id="left-view" className="container mt-5 ">
              <div className="row w-50 text-right">
                <div id="tagline">
                  <h1>DISCOVER EVENTS AND WORKSHOPS!</h1>
                </div>
                <div>
                  Get notified about workshops and events happening in restaurants
                  around you! Easily register through our online registration.
                </div>
              </div>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </div>
  );
}

export default App;
