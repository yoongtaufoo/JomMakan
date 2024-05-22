import React, { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import image from "./assets/image 3.png";
import Tabs from "./components/Tabs.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import workshopPic from "./assets/workshop.png";
import CollectionCard from "./components/CollectionCard.jsx";
import axios from "axios";

const MyRegistration = () => {
  // Function body
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [registrations, setRegistrations] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    //get username from local storage
    //const token = localStorage.getItem("JomMakanUser");
    const { token } = useAuth();
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    axios
      .get("http://localhost:3001/api/registration/my_registrations", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setRegistrations(data);
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/workshop/workshops"
        );
        // const data = await response.json();
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []);
  

  //For filtering
  const filteredWorkshops = registrations.filter((registration) => {
    const statusFilter = {
      0: "U",
      1: "D",
      2: "C",
    };
    const status = statusFilter[activeTab];
    // console.log(status)
    const query = searchQuery.toLowerCase();
    // if (status === undefined) return true; // Default case

    const workshop = workshops.find(
      (rest) => rest._id === registration.workshop_id
    );
    

    const workshopName = workshop ? workshop.workshopName.toLowerCase() : "";
    const workshopDate = workshop ? workshop.date.toLowerCase() : "";
    const workshopAddress = workshop ? workshop.address.toLowerCase() : "";

    if (registration.status === status) {
      return (
        // (reservation.status === status &&
        (registration.name.toLowerCase().includes(query) ||
        workshopDate.includes(query) ||
        registration.phone.includes(query) ||
        workshopName.includes(query) ||
        workshopAddress.includes(query)) 
      );
    }
  });

  const handleTabClick = (index) => {
    setActiveTab(index); // Update the activeTab state
  };

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <br />
        <div
          className="back-btn"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <i class="bi bi-arrow-left-circle"></i> Back
        </div>

        <h1 className="custom-h1">My Workshops</h1>

        <Tabs
          tabdata={{ one: "Upcoming", two: "Completed", three: "Cancelled" }}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          searchBarPlaceholder={"Workshops, Events..."}
          searchQuery={(query) => setSearchQuery(query)}
          onSearchChange={handleSearchInputChange}
        />
        <br />
        <div className="card mb-3">
          {filteredWorkshops.map((registration) => (
            <CollectionCard key={registration.id} registrations={registration} />
            // <CollectionCard key={registration.id} workshop={registration} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRegistration;

//U for upcoming, D for COmpleted, C for cancelled
// const Rworkshop = [
//   {
//     id: 1,
//     name: "Miyabi - Sheraton Petaling Jaya",
//     image: workshopPic,
//     description:
//       "A dining venue where an a la carte selection of customary Japanese specialties takes center stage.",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     timeslot: "12.00-5.00 pm, 1 May 2024",
//     Rname: "Ali",
//     Rphone: "02345",
//     Rpax: 2,
//     Rstatus: "U",
//   },
//   {
//     id: 2,
//     name: "Sala Bar - Sheraton Petaling Jaya",
//     image: workshopPic,
//     description:
//       "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     timeslot: "12.00-5.00 pm, 1 May 2024",
//     Rname: "Abi",
//     Rphone: "02345",
//     Rpax: 4,
//     Rstatus: "U",
//   },
//   {
//     id: 3,
//     name: "Wworkshop Bi",
//     image: workshopPic,
//     description:
//       "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     timeslot: "12.00-5.00 pm, 1 May 2024",
//     Rname: "Abi",
//     Rphone: "02345",
//     Rpax: 4,
//     Rstatus: "D",
//   },
//   {
//     id: 4,
//     name: "Wokshop voo",
//     image: workshopPic,
//     description:
//       "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     timeslot: "12.00-5.00 pm, 1 May 2024",
//     Rname: "Abi",
//     Rphone: "02345",
//     Rpax: 4,
//     Rstatus: "D",
//   },
//   {
//     id: 5,
//     name: "Wokkywooki",
//     image: workshopPic,
//     description:
//       "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     timeslot: "12.00-5.00 pm, 1 May 2024",
//     Rname: "Abi",
//     Rphone: "02345",
//     Rpax: 4,
//     Rstatus: "C",
//   },
//   {
//     id: 6,
//     name: "Barbie Gatherings",
//     image: workshopPic,
//     description:
//       "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
//     address:
//       "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
//     phone: "03-22637434",
//     timeslot: "12.00-5.00 pm, 1 May 2024",
//     Rname: "Abi",
//     Rphone: "02345",
//     Rpax: 4,
//     Rstatus: "C",
//   },
// ];