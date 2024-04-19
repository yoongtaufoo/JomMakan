import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
// import res1 from "./assets/Restaurant1.jpg";
// import res2 from "./assets/Restaurant2.jpg";
// import res3 from "./assets/Restaurant3.jpg";
// import res4 from "./assets/Restaurant4.jpg";
// import res5 from "./assets/Restaurant5.jpg";
// import res6 from "./assets/Restaurant6.jpg";
import image from "./assets/image 3.png";
import SearchBar from "./components/SearchBar";
import "./Home.css";
import { restaurants } from "./RestaurantData";

// const restaurants = [
//   { id: 1,
//     name: 'Miyabi - Sheraton Petaling Jaya',
//     image: res1, description: 'A dining venue where an a la carte selection of customary Japanese specialties takes center stage.' ,
//     location:'Petaling Jaya',
//     address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur',
//     phone: '03-22637434',
//     openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
//     cuisine: 'steakhouse',
//     review: '3.5'},
//   { id: 2,
//     name: 'Sala Bar - Sheraton Petaling Jaya',
//     image: res2,
//     description: 'Conceived as a laidback haven for cigar and whisky connoisseurs to convene.' ,
//     location:'Puchong',
//     address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur',
//     phone: '03-22637434',
//     openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
//     cuisine: 'wine',
//     review: '4.5'},
//   { id: 3,
//     name: 'Colonial Cafe',
//     image: res3,
//     description: 'The Colonial Cafe recreates the atmosphere of the halcyon days of the planters of Malaya.' ,
//     location:'Kajang',
//     address:'Colonial Cafe, The Majestic Hotel, 5, Jalan Sultan Hishamuddin',
//     phone: '03-22637434',
//     openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
//     cuisine: 'local Malaysia',
//     review: '3.8'},
//   { id: 4,
//     name: 'PRIME - Le Méridien Kuala Lumpur',
//     image: res4,
//     description: 'Delight your palate with Australian cuts of beef, including tenderloin, sirloin, rib-eye and prime rib.' ,
//     location:'Kuala Lumpur',
//     address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur',
//     phone: '03-22637434',
//     openinghours: 'Mon-Sat 12–3 pm, 6–10 pm',
//     cuisine: 'steakhouse',
//     review: '4.8'},
//   { id: 5,
//     name: 'Yun House at Four Seasons Hotel',
//     image: res5,
//     description: 'A Cantonese with an edge, Yun House stretches the boundaries with elevated Chinese favourites.' ,
//     location:'Petaling Jaya',
//     address:'Yue, Lorong Utara C, Pjs 52, 46200 Petaling Jaya, Selangor',
//     phone: '03-22637434',
//     openinghours: 'Mon-Sat 12–3 pm, 6–10 pm',
//     cuisine: 'chinese',
//     review: '3.5'},
//   { id: 6,
//     name: 'Cinnamon Coffee House',
//     image: res6,
//     description: 'Start your day with a perfect morning pick-me-up at our award-winning Cinnamon Coffee House!' ,
//     location:'Petaling Jaya',
//     address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur',
//     phone: '03-22637434',
//     openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
//     cuisine: 'dessert',
//     review: '3.5'}
// ];

const Home = () => {
  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: "100%" }} />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="customized-h1">Discover Restaurants</h1>
          <div className="ml-auto ">
            <Link to="/fav-restaurant">
              <small className="back-btn">
                <i className="bi bi-heart-fill custom-icon"></i>Favourites
              </small>
            </Link>
            <Link to="/reservations">
              <small className="back-btn">
                <i className="bi bi-calendar-heart custom-icon"></i>My Reservations
              </small>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="mt-4">
            <strong>
              <u>Top Picks</u>
            </strong>
          </div>
          <div>
            <SearchBar place="Locations, Restaurant, or Cuisines..." />
          </div>
        </div>
        <br />
        <div className="restaurants-list row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col custom-col">
              <Link
                to={`/restaurant/${restaurant.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card customized-restaurant-card">
                  <img
                    src={restaurant.image}
                    className="card-img-top"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">{restaurant.description}</p>
                  </div>
                  <div className="card-footer custom-card-footer d-flex justify-content-between">
                    <small className="text-muted">
                      <i className="bi-geo-alt-fill custom-icon"></i>
                      <span className="custom-card-text">
                        {restaurant.location}
                      </span>
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-star-half custom-icon"></i>
                      <span className="custom-card-text">
                        Review:
                        {restaurant.review}
                      </span>
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
