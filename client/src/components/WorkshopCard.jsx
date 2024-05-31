import React, { useState, useEffect  } from "react";
import "./WorkshopCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


const WorkshopCard = ({ workshop }) => {
  const [starred, setStarred] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Extract user ID from JWT token
  const token = localStorage.getItem("JomMakanUser");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    if (userId && workshop.registered) {
      setIsRegistered(workshop.registered.includes(userId));
    }
  }, [userId,workshop.registered]);
/*
  useEffect(()=>{
    const fetchWorkshopData = async() => {
      try{
        //Get the token from localStorage or from wherever it's stored
        const token = localStorage.getItem("JomMakanUser");
        if (!token) {
          alert("User is not authenticated.");
          return;
        }
        
        //Set the request headers with the token
        //const config = token? { headers: {Authorization: token }} :{};
      
        const { data } = await axios.get(`http://localhost:3001/api/workshop/${_id}`, { headers: { Authorization: token } });
        
        // Log the retrieved data for debugging
        console.log(data.workshop);
        console.log(data.isSaved);

        //Update state with the retrieved workshop data
        setWorkshop(data.workshop);

        //If isSaved is defined in the response, update the state
        if(data.isSaved !== undefined){
          setIsSaved(data.isSaved);
        }
      } catch (error){
        console.error("Error fetching workshop or isSaved status:", error);
      }
    };

    //Call the fetchWorkshopData function when the component mounts or when _id changes
    fetchWorkshopData();
  }, [_id]); //Dependency array
*/
  useEffect(() => {

    const handleSaveToggle = async () => {
      const token = localStorage.getItem("JomMakanUser"); // Get JWT from localStorage
      if (!token) {
        alert("User is not authenticated."); // Handle case where user is not authenticated
        return;
      }
    
      if (!workshop) {
        console.log("Workshop data is not loaded.");
        return;
      }
    
      try {
        if (isSaved) {
          // If the workshop is already saved, perform unsave action
          const savedWorkshop = await axios.get(
            `http://localhost:3001/api/workshop/favworkshops/${workshop._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const favWorkshopId = savedWorkshop.data._id; // Extract favWorkshopId from the response
    
          await axios.delete(
            `http://localhost:3001/api/workshop/favworkshops/${favWorkshopId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log("Workshop unsaved successfully");
          setIsSaved(false); // Update the state to reflect the unsaved state
        } else {
          // If the restaurant is not saved, perform save action
          await axios.post(
            `http://localhost:3001/api/workshop/${workshop._id}/addFavWorkshop`,
            {
              ...workshop,
              workshop_id: workshop._id,
              status: "S",
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log("Workshop saved successfully");
          setIsSaved(true); // Update the state to reflect the saved state
        }
      } catch (error) {
        console.log("Unable to perform save/unsave action:", error.message);
      }
    };
    // Add console logs to debug
    //console.log("Workshop Data:", workshop);
  
  })

  return (
    <div key={workshop._id} className="col custom-col">
      <div className="card customized-workshop-card">
        {workshop.photoLink && (
          <img
            src={workshop.photoLink}
            className="card-img-top"
            alt={workshop.workshopName}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{workshop.workshopName}</h5>
          <p className="card-text">{workshop.workshopDescription}</p>
        </div>

        <div>
          {isRegistered ? (
            <button
              type="button"
              className="btn btn-secondary btn-lg custom-add-schedule"
              style={{ backgroundColor: "gray", cursor: "not-allowed" ,width:"70%",marginBottom:"15px"}}
              disabled
            >
              Scheduled
            </button>
          )
          : workshop.availableSlot === 0 ? (
            <button
              type="button"
              className="btn btn-secondary btn-lg custom-add-schedule"
              style={{ backgroundColor: "gray", cursor: "not-allowed",width:"70%" ,marginBottom:"15px"}}
              disabled
            >
              FULL XD
            </button>
          ) 
          : (
            <Link
              to={`/workshop/${workshop._id}`}
              style={{ textDecoration: "none", color: "inherit",width:"70%",marginBottom:"15px" }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-lg custom-add-schedule"
              >
                Add to Schedule
              </button>
            </Link>
          )}
          <FontAwesomeIcon
            icon={starred ? faStar : farStar}
            className="star-icon"
            onClick={handleSaveToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
