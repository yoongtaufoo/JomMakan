import React from "react";
import "./404.css"
import { useState, useEffect } from "react";

const NotFoundPage = () => {
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });


  return (
    <div
      className="background-container"
    >
      <h1>404 NOT FOUND</h1>
      <p>You have fallen into The Void...</p>
    </div>
  );
  
};

export default NotFoundPage;
