import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        {/* <Route exact path="/" element={<Home />} /> */}
        {/* add route for new pages here */}
      </Routes>
    </Router>
  </React.StrictMode>
);
