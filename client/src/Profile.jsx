import React from "react";
import "./SignUp.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <Navbar />
      <Link to={"/"}>
        <button>Sign Out</button>
      </Link>
    </div>
  );
};

export default SignUp;
