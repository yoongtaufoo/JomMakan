import React from 'react';
import Navbar from './components/Navbar';
import res1 from "./assets/Restaurant1.jpg";
import res2 from "./assets/Restaurant2.jpg";
import res3 from "./assets/Restaurant3.jpg";
import res4 from "./assets/Restaurant4.jpg";
import res5 from "./assets/Restaurant5.jpg";
import res6 from "./assets/Restaurant6.jpg";
import image from "./assets/image 3.png";
import './Home.css';

const restaurants = [
  { id: 1, name: 'Miyabi - Sheraton Petaling Jaya', image: res1, description: 'A dining venue where an a la carte selection of customary Japanese specialties takes center stage.' , location:'Petaling Jaya', review: '3.5'},
  { id: 2, name: 'Sala Bar - Sheraton Petaling Jaya', image: res2, description: 'Conceived as a laidback haven for cigar and whisky connoisseurs to convene.' , location:'Puchong', review: '4.5'},
  { id: 3, name: 'Colonial Cafe', image: res3, description: 'The Colonial Cafe recreates the atmosphere of the halcyon days of the planters of Malaya.' , location:'Kajang', review: '3.8'},
  { id: 4, name: 'PRIME - Le Méridien Kuala Lumpur', image: res4, description: 'Delight your palate with Australian cuts of beef, including tenderloin, sirloin, rib-eye and prime rib.' , location:'Kuala Lumpur', review: '4.8'},
  { id: 5, name: 'Yun House at Four Seasons Hotel', image: res5, description: 'A Cantonese with an edge, Yun House stretches the boundaries with elevated Chinese favourites.' , location:'Petaling Jaya', review: '3.5'},
  { id: 6, name: 'Cinnamon Coffee House', image: res6, description: 'Start your day with a perfect morning pick-me-up at our award-winning Cinnamon Coffee House!' , location:'Petaling Jaya', review: '3.5'}
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <img src={image} alt="" style={{ width: '100%' }}/>
      <div className='container'>
        <h1 className='custom-h1'>Discover Restaurants</h1>
        <div class="d-flex justify-content-between align-items-center">
          <h5><u>Top Picks</u></h5>
          <div class="ml-auto">
            
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="col custom-col">
              <div className="card custom-card">
                <img src={restaurant.image} className="card-img-top" alt={restaurant.name} />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">{restaurant.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <small className="text-muted"><i className='bi-geo-alt-fill'></i>{restaurant.location}</small>
                  <small className="text-muted"><i class="bi bi-star-half"></i>Review: {restaurant.review}</small>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
