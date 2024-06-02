import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "react-router-dom";
import "./App.css";
import drip from "./assets/drip.png";
import gif from "./assets/eggif.gif";
import breakfast from "./assets/breakfast.png";
import shadow from "./assets/shadow.png";
import logo from "./assets/logo.png";
import reservation from "./assets/reservation.png";
import reservationShadow from "./assets/shadow3.png";
import workshop from "./assets/cooking.png";
import workshopShadow from "./assets/cookingshadow.png";
import restaurant3d from "./assets/restaurant3d.png";
import restaurantshadow from "./assets/restaurantshadow.png";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
function App() {
  return (
    <div>
      <Parallax pages={4} className="parallax-wrapper">
        <nav className="nav">
          {/* <nav className={`navbar ${show && "hidden"}`}> */}
          <img className="ms-4 " src={logo} id="logo"></img>
          <li>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        </nav>
        {/* <div id="yellow"> */}
        <ParallaxLayer
          offset={0}
          speed={0.01}
          // sticky={{ start: 0, end: 2 }}
        >
          <div id="yellow-view">
            <div id="tagline1">
              <Typewriter
                words={["SCRAMBLING FOR FLAVOUR?"]}
                loop={100}
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={70}
                delaySpeed={7000}
              />
            </div>
            <div id="tagline1">
              <Typewriter
                words={["WE GOT YOU COVERED!"]}
                loop={100}
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={70}
                delaySpeed={7000}
              />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <img src={shadow} id="left" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6}>
          <img src={breakfast} id="left" />
        </ParallaxLayer>
        {/* </div> */}
        <ParallaxLayer
          offset={1.2}
          speed={0.9}
          // sticky={{ start: 1.2, end: 2.2 }}
        >
          <div id="red-view">
            <div className="row w-50">
              <div id="tagline">
                <h1>DISCOVER LOCAL RESTAURANTS</h1>
              </div>
              <div>
                Deciding where to eat has never been easier! Get daily, fresh
                recommendations to try out hidden gems or well-loved
                neighborhood eateries operated by local entrepreneurs.
              </div>
              {/* <Link to="/signup">
                <button className="getstartedbtn">Get Started</button>
              </Link> */}
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.555} speed={0.5}>
          <img src={restaurantshadow} id="right1" />
          <ParallaxLayer offset={0.2} speed={0.155}>
            <img src={restaurant3d} id="right1" />
          </ParallaxLayer>
        </ParallaxLayer>
        {/* <div id="green"> */}
        <ParallaxLayer
          offset={2}
          speed={0.9}
          // sticky={{ start: 3.2, end: 3.2 }}
        >
          <div id="green-view">
            <div className="row w-50">
              <div id="tagline">
                <h1>ONLINE RESTAURANT RESERVATION!</h1>
              </div>
              <div>
                Make restaurant reservations without a hassle! JomMakan provides
                online restaurant reservation services with zero-charge
                cancellation fee!
              </div>
              {/* <Link to="/signup">
                <button className="getstartedbtn">Get Started</button>
              </Link> */}
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2.2} speed={0.45}>
          <img src={reservationShadow} id="left" />
        </ParallaxLayer>
        <ParallaxLayer offset={2.2} speed={0.5}>
          <img src={reservation} id="left" />
        </ParallaxLayer>
        {/* </div> */}
        <ParallaxLayer
          offset={3.0}
          speed={1}
          // sticky={{ start: 3.2, end: 4 }}
        >
          <div id="purple-view">
            <div className="row w-50">
              <div id="tagline">
                <h1>DISCOVER EVENTS AND WORKSHOPS!</h1>
              </div>
              <div>
                Get notified about workshops and events happening in restaurants
                around you! Easily register through our online registration.
              </div>
              {/* <Link to="/signup">
                <button className="getstartedbtn">Get Started</button>
              </Link> */}
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3.3} speed={0.45}>
          <img src={workshopShadow} id="right" />
        </ParallaxLayer>
        <ParallaxLayer offset={3.3} speed={0.35}>
          <img src={workshop} id="right" />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
