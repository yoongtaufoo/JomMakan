import { useState } from 'react'
import './App.css'
import logo from "./assets/logo.png"
import gif from "./assets/eggif.gif"
import drip from "./assets/drip.png"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Link } from "react-router-dom";

function App() {
// this is the landing page
  return (
    <>
      <nav className='navbar'>
        <img src={logo} id='logo'></img>
        <li>
          <Link to="/home">
            <button>Login</button>
          </Link>
        </li>
      </nav>
      {/* <Parallax pages={2}>
        <ParallaxLayer speed={1}> */}
          <div id='first-view'>
            <img src={drip} id='drip'></img>
            <div id='tagline'>Scrambling for Flavor? We Have You Covered!</div>
            <img src={gif} id='gif'></img>
          </div>
        {/* </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}> */}
          <div id='second-view'>
            <div id='tagline'>Discover Restaurants!</div>
            <div>Deciding where to eat has never been easier! Get daily, fresh recommendations to try out hidden gems or well-loved neighbourhood eateries operated by local entrepreneurs. </div>
            {/* <img src={gif} id='gif'></img> */}
          </div>
        {/* </ParallaxLayer>
      </Parallax> */}
      <div id='second-view'>
            <div>Deciding where to eat has never been easier! Get daily, fresh recommendations to try out hidden gems or well-loved neighbourhood eateries operated by local entrepreneurs. </div>
            <div id='tagline'>Discover Restaurants!</div>
            {/* <img src={gif} id='gif'></img> */}
          </div>
    </>
  )
}

export default App
