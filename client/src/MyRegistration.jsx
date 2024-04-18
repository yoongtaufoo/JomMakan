import React, { useState } from "react";
import Navbar from "./components/Navbar";
import image from "./assets/image 3.png";
import Tabs from "./components/Tabs.jsx";
import { useNavigate } from "react-router-dom";
import workshopPic from "./assets/workshop.png";
import CollectionCard from "./components/CollectionCard.jsx";

const MyRegistration = () => {
  // Function body
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  //U for upcoming, D for COmpleted, C for cancelled
  const Rworkshop = [
    {
      id: 1,
      name: "Miyabi - Sheraton Petaling Jaya",
      image: workshopPic,
      description:
        "A dining venue where an a la carte selection of customary Japanese specialties takes center stage.",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      timeslot: "12.00-5.00 pm, 1 May 2024",
      Rname: "Ali",
      Rphone: "02345",
      Rpax: 2,
      Rstatus: "U",
    },
    {
      id: 2,
      name: "Sala Bar - Sheraton Petaling Jaya",
      image: workshopPic,
      description:
        "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      timeslot: "12.00-5.00 pm, 1 May 2024",
      Rname: "Abi",
      Rphone: "02345",
      Rpax: 4,
      Rstatus: "U",
    },
    {
      id: 3,
      name: "Wworkshop Bi",
      image: workshopPic,
      description:
        "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      timeslot: "12.00-5.00 pm, 1 May 2024",
      Rname: "Abi",
      Rphone: "02345",
      Rpax: 4,
      Rstatus: "D",
    },
    {
      id: 4,
      name: "Wokshop voo",
      image: workshopPic,
      description:
        "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      timeslot: "12.00-5.00 pm, 1 May 2024",
      Rname: "Abi",
      Rphone: "02345",
      Rpax: 4,
      Rstatus: "D",
    },
    {
      id: 5,
      name: "Wokkywooki",
      image: workshopPic,
      description:
        "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      timeslot: "12.00-5.00 pm, 1 May 2024",
      Rname: "Abi",
      Rphone: "02345",
      Rpax: 4,
      Rstatus: "C",
    },
    {
      id: 6,
      name: "Barbie Gatherings",
      image: workshopPic,
      description:
        "Conceived as a laidback haven for cigar and whisky connoisseurs to convene.",
      address:
        "2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur",
      phone: "03-22637434",
      timeslot: "12.00-5.00 pm, 1 May 2024",
      Rname: "Abi",
      Rphone: "02345",
      Rpax: 4,
      Rstatus: "C",
    },
  ];

  //For filtering
  const filteredWorkshops = Rworkshop.filter((workshop) => {
    if (activeTab === 0) return workshop.Rstatus === "U";
    if (activeTab === 1) return workshop.Rstatus === "D";
    if (activeTab === 2) return workshop.Rstatus === "C";
    return true; // Default case
  });

  const handleTabClick = (index) => {
    setActiveTab(index); // Update the activeTab state
  };

  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <br />
        <div className='back-btn' style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <i class="bi bi-arrow-left-circle"></i> Back
        </div>

        <h1 className="custom-h1">My Schedule</h1>

        <Tabs
          tabdata={{ one: "Upcoming", two: "Completed", three: "Cancelled" }}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          searchBarPlaceholder={"Workshops, Events..."}
        />
        <br />
        <div className="card mb-3">
          {filteredWorkshops.map((registration) => (
            <CollectionCard key={registration.id} workshops={registration} />
            // <CollectionCard key={registration.id} workshop={registration} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRegistration;
