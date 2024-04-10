import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Reservation from "./Reservation.jsx";
import Workshop from "./Workshop.jsx";
import WRegistration from "./Registration.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/reserve" element={<Reservation />} />
        <Route exact path="/workshop" element={<Workshop/>}/>
        <Route exact path="/wregister" element={<WRegistration/>}/>
        {/* add route for new pages here, import the component*/}
      </Routes>
    </Router>
  </React.StrictMode>
);

