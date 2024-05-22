import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "react-router-dom";
import "./App.css";
import drip from "./assets/drip.png";
import gif from "./assets/eggif.gif";
import breakfast from "./assets/breakfast.png"
import shadow from "./assets/shadow.png";
import logo from "./assets/logo.png";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useTypewriter, Cursor, Typewriter } from 'react-simple-typewriter';
function App() {
  // Show navbar, hide navbar when scroll down
  const [show, setShow] = useState(true)
  const controlNavbar = () => { 
    if (window.scrollY > 100) {
      setShow(false)
    } else { 
      setShow(true)
    }
  }

  useEffect(() => { 
    window.addEventListener('scroll',controlNavbar)
    return () => { 
      window.removeEventListener('scroll',controlNavbar)
    }
  },[])


  return (
    <div>
      <nav className="nav">
        {/* <nav className={`navbar ${show && "hidden"}`}> */}
        <img className="ms-4 " src={logo} id="logo"></img>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
      </nav>

      <Parallax pages={5} className="parallax-wrapper">
        <div id="yellow">
          <ParallaxLayer offset={0} speed={0.01} sticky={{ start: 0, end: 2 }}>
            <div id="yellow-view">
              {/* <img src={breakfast} id="breakfast"></img> */}
              <div className="buttonLanding">
                <button>Learn More</button>
              </div>
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
              <button className="buttonLanding">Login</button>
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
            <img src={shadow} id="breakfast" />
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={0.8}>
            <img src={breakfast} id="breakfast" />
          </ParallaxLayer>
        </div>
        <ParallaxLayer
          offset={0.3}
          speed={0.8}
          sticky={{ start: 1.2, end: 2.2 }}
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
              <Link to="/signup">
                <button className="getstartedbtn">Get Started</button>
              </Link>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5} sticky={{ start: 2.2, end: 3.2 }}>
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
              <Link to="/signup">
                <button className="getstartedbtn">Get Started</button>
              </Link>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.7} sticky={{ start: 3.2, end: 4.2 }}>
          <div id="purple-view">
            <div className="row w-50">
              <div id="tagline">
                <h1>DISCOVER EVENTS AND WORKSHOPS!</h1>
              </div>
              <div>
                Get notified about workshops and events happening in restaurants
                around you! Easily register through our online registration.
              </div>
              <Link to="/signup">
                <button className="getstartedbtn">Get Started</button>
              </Link>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
      {/* <img
          src={gif}
          alt="Fixed GIF"
          id="gif"
          style={{ opacity: scrollPosition < windowHeight ? 1 : 0 }}
        /> */}
    </div>
  );
}

export default App;
