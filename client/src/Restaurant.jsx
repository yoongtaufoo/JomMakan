import React, {useState, useRef} from 'react'; 
import Navbar from './components/Navbar';
import res1 from "./assets/Restaurant1.jpg";
import res2 from "./assets/Restaurant2.jpg";
import res3 from "./assets/Restaurant3.jpg";
import res4 from "./assets/Restaurant4.jpg";
import res5 from "./assets/Restaurant5.jpg";
import res6 from "./assets/Restaurant6.jpg";
import p1 from "./assets/details1.jpg";
import p2 from "./assets/details2.jpg";
import p3 from "./assets/details3.jpg";
import p4 from "./assets/details4.jpg";
import p5 from "./assets/details5.jpg";
import p6 from "./assets/details6.jpg";
import p7 from "./assets/details7.jpg";
import './Restaurant.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const photos = [p1,p2,p3,p4,p5,p6,p7];

const restaurants = [
    { id: 1, 
      name: 'Miyabi - Sheraton Petaling Jaya', 
      image: res1, description: 'A dining venue where an a la carte selection of customary Japanese specialties takes center stage.' , 
      location:'Petaling Jaya',
      address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur', 
      phone: '03-22637434',
      openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
      cuisine: 'steakhouse',
      resPhotos: photos,
      review: '3.5'},
    { id: 2, 
      name: 'Sala Bar - Sheraton Petaling Jaya', 
      image: res2, 
      description: 'Conceived as a laidback haven for cigar and whisky connoisseurs to convene.' , 
      location:'Puchong', 
      address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur', 
      phone: '03-22637434',
      openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
      cuisine: 'wine',
      resPhotos: photos,
      review: '4.5'},
    { id: 3, 
      name: 'Colonial Cafe', 
      image: res3, 
      description: 'The Colonial Cafe recreates the atmosphere of the halcyon days of the planters of Malaya.' , 
      location:'Kajang', 
      address:'Colonial Cafe, The Majestic Hotel, 5, Jalan Sultan Hishamuddin', 
      phone: '03-22637434',
      openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
      cuisine: 'local Malaysia',
      resPhotos: photos,
      review: '3.8'},
    { id: 4, 
      name: 'PRIME - Le Méridien Kuala Lumpur', 
      image: res4, 
      description: 'Delight your palate with Australian cuts of beef, including tenderloin, sirloin, rib-eye and prime rib.' , 
      location:'Kuala Lumpur', 
      address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur', 
      phone: '03-22637434',
      openinghours: 'Mon-Sat 12–3 pm, 6–10 pm',
      cuisine: 'steakhouse',
      resPhotos: photos,
      review: '4.8'},
    { id: 5, 
      name: 'Yun House at Four Seasons Hotel', 
      image: res5, 
      description: 'A Cantonese with an edge, Yun House stretches the boundaries with elevated Chinese favourites.' , 
      location:'Petaling Jaya', 
      address:'Yue, Lorong Utara C, Pjs 52, 46200 Petaling Jaya, Selangor', 
      phone: '03-22637434',
      openinghours: 'Mon-Sat 12–3 pm, 6–10 pm',
      cuisine: 'chinese',
      resPhotos: photos,
      review: '3.5'},
    { id: 6, 
      name: 'Cinnamon Coffee House', 
      image: res6, 
      description: 'Start your day with a perfect morning pick-me-up at our award-winning Cinnamon Coffee House!' , 
      location:'Petaling Jaya', 
      address:'2, Jalan Stesen Sentral, Kuala Lumpur Sentral, 50470 Kuala Lumpur', 
      phone: '03-22637434',
      openinghours: 'Mon-Sat 12–2:30 pm, 6:30–10:30 pm',
      cuisine: 'dessert',
      resPhotos: photos,
      review: '3.5'}
  ];

const Restaurant = () => {
    const {id} = useParams();
    const sliderRef = useRef(null);
    const scrollAmount = 100;

    const [isSaved, setIsSaved] = useState(false);


    const handleSaveToggle = () => {
        setIsSaved(prevState => !prevState);
    };

    const restaurant = restaurants.find(restaurant => restaurant.id === parseInt(id));
    const [images, setImages] = useState(restaurant.resPhotos);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <br />
      <div className="d-flex justify-content-between align-items-center">
          <Link to="/home">
          <small>Back</small>
          </Link>
          <div className="ml-auto">
            <small className="text-muted" onClick={handleSaveToggle}>
                <i className={`bi ${isSaved ? 'bi-heart-fill' : 'bi-heart'} custom-icon`}></i>
                {isSaved ? 'Unsave this restaurant' : 'Save this restaurant'}
            </small>
          </div>
        </div>
        <br />
      <img src={restaurant.image} alt="" style={{ width: '100%', height:'500px' }}/>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className='custom-h1'>{restaurant.name}</h1> 
          <div className="ml-auto">
            <small className="text-muted"><i className="bi bi-calendar-heart custom-icon"></i>Make reservations</small>
          </div>
        </div>
        
        <br />
        <p className="card-text">{restaurant.description}</p>
        <p className="card-text"><i className='bi-geo-alt-fill custom-icon'></i>{restaurant.phone}</p>
        <p className="card-text"><i className="bi bi-telephone-fill custom-icon"></i>{restaurant.address}</p>
        <p className="card-text"><i className="bi bi-clock-fill custom-icon"></i>{restaurant.openinghours}</p>
        <p className="card-text"><i className="bi bi-egg-fried custom-icon"></i>{restaurant.cuisine}</p>
        <br />
        <h5 className='card-text'>Photos</h5>
        
        <div className="App">
        <button
        className="nav-btn"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
        }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
    {/* Image container */}
      <div className="images-container" ref={sliderRef}>
        {images.map((image) => {
          return (
            <img
              className="image"
              alt="sliderImage"
              // key={image?.id}
              src={image}
            />
          );
        })}
      </div>
    {/* Right navigation button */}
      <button
        className="nav-btn"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft += scrollAmount; // Scroll right by the specified amount
        }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
      </div>
        <h5>Review</h5>
    </div>
</div>
  );
}

export default Restaurant;
