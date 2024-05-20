import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import "./Restaurant.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";
import axios from "axios";

const renderRatingStars = (rating) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars === 0.5;

  return (
    <div className="star-container">
      {[...Array(filledStars)].map((_, index) => (
        <BsStarFill key={index} className="star-icon filled-star" />
      ))}
      {hasHalfStar && (
        <i
          key="halfStar"
          className="bi bi-star-half star-icon filled-star half-star"
        ></i>
      )}
      {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <BsStar key={filledStars + index} className="star-icon empty-star" />
      ))}
    </div>
  );
};

const Restaurant = () => {
  const navigate = useNavigate();
  const popRef = useRef(null);
  const [deleted, setDelete] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasLiked, setHasLiked] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showDetailsPopups, setShowDetailsPopups] = useState(null);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [selectedShareOption, setSelectedShareOption] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isDropdownIndex, setIsDropdownIndex] = useState(null);
  const { _id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);

  let userid = "User123";
  
  // const handleFacebook = (index) => {
  //   console.log("Share on Facebook clicked for review at index:", index);
  //   setIsDropdownIndex(null);
  // };
  // const handleEmail = (index) => {
  //   console.log("Share via email clicked for review at index:", index);
  //   setIsDropdownIndex(null);
  // };
  // const toggleDropdown = (index) => {
  //   setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  // };
  // const toggleShareDropdown = (index) => {
  //   setIsDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  // };
  // // const handleSaveToggle = () => {
  // //   setIsSaved((prevState) => !prevState);
  // // };

  // const restaurantId = useParams()._id;
  // console.log(useParams());
  // // const restaurantid = parseInt(id);
  // console.log("restaurantId:", restaurantId);

  // const id = typeof restaurantId === "object" ? restaurantId._id : restaurantId;
  // console.log("id:", id);

 

  // get userid from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  if (storedUser) {
    userid = storedUser.user._id;
  }

  const handleSaveToggle = async () => {
    const token = localStorage.getItem("JomMakanUser"); // Get JWT from localStorage
    if (!token) {
      alert("User is not authenticated."); // Handle case where user is not authenticated
      return;
    }

    if (!_id) {
      console.log("favRestaurantId is undefined.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/restaurant/${_id}/addFavRestaurant`,
        {
          favRestaurantId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT in request headers
          },
        }
      );
      setIsSaved(!isSaved);
      console.log("restaurant saved successfully" + response.data.message);
      navigate(`/restaurant/${_id}`);
    } catch (error) {
      console.log("Unable to save restaurant:" + error.message);
    }
  };

  // const id = typeof restaurantId === 'object' ? restaurantId._id : restaurantId;

  // try {
  //   const response = await axios.post(
  //     "http://localhost:3001/api/restaurant/addFavRestaurant",
  //     { restaurantId: id, isSaved: !isSaved } // Toggle the save state
  //   );
  //   console.log(response.data.message); // Log success message or handle as needed
  //   setIsSaved(!isSaved); // Update the UI state
  // } catch (error) {
  //   console.error('Error toggling favorite:', error);
  //   // Handle error
  // }

  const handleLike = (index) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      if (newLikes[index] === 0) {
        newLikes[index] = 1;
        setHasLiked((prevHasLiked) => {
          const newHasLiked = [...prevHasLiked];
          newHasLiked[index] = true;
          return newHasLiked;
        });
      } else {
        newLikes[index] = 0;
        setHasLiked((prevHasLiked) => {
          const newHasLiked = [...prevHasLiked];
          newHasLiked[index] = false;
          return newHasLiked;
        });
      }
      return newLikes;
    });
  };

  const handleEdit = (index) => {
    console.log("Edit review at index:", index);
    setOpenDropdownIndex(null);
  };

  useEffect(() => {
    let handler = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setDelete(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  },[]);


  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/restaurant/${_id}`)
      .then(({ data }) => {
        setRestaurant(data);
        setReviews(data.reviews || []);
        setHasLiked(new Array(data.reviews.length).fill(false));
        setLikes(new Array(data.reviews.length).fill(0));
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
      });
  }, [_id]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/home`} className="back-btn">
            <i className="bi bi-arrow-left-circle"></i> Back
          </Link>
          <div className="ml-auto">
            <small className="back-btn" onClick={handleSaveToggle}>
              <i
                className={`bi ${
                  isSaved ? "bi-heart-fill" : "bi-heart"
                } custom-icon`}
              ></i>
              {isSaved ? "Unsave this restaurant" : "Save this restaurant"}
            </small>
          </div>
        </div>
        <br />
        <img
          src={restaurant.image}
          alt=""
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
        />
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="custom-h1">{restaurant.name}</h1>
          <div>
            <Link to={`/restaurant/${_id}/reserve`}>
              <button id="reserve-btn">
                {/* <i className="bi bi-calendar-heart custom-icon"></i>Make */}
                Make Reservation
              </button>
            </Link>
          </div>
        </div>

        <br />
        <p className="card-text">{restaurant.description}</p>
        <p className="card-text">
          <i className="bi-geo-alt-fill custom-icon"></i>
          {restaurant.phone}
        </p>
        <p className="card-text">
          <i className="bi bi-telephone-fill custom-icon"></i>
          {restaurant.address}
        </p>
        <p className="card-text">
          <i className="bi bi-clock-fill custom-icon"></i>
          {restaurant.openinghours}
        </p>
        <p className="card-text">
          <i class="bi bi-egg-fried custom-icon"></i>
          {restaurant.cuisine}
        </p>
        <br />
        <h5 className="card-text">
          <strong>Photos</strong>
        </h5>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {restaurant.foodImage &&
              restaurant.foodImage.map((photo, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={photo}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                    style={{ height: "500px", objectFit: "contain" }}
                  />
                </div>
              ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <h5 id="review-title ">
            <strong>Reviews</strong>
          </h5>
          <div className="ml-auto">
            <Link to={`/restaurant/${_id}/addReview?restaurantName=${restaurant.name}`}>
              <button type="button" className="button-add-reviews">
                <i className="bi-plus"></i>Add a review
              </button>
            </Link>
          </div>
        </div>
        <div
          className="box-flex fd-column info-reviews-rating-section"
          data-testid="info-reviews-rating"
        >
          <div className="info-left">
            <div className="box-flex fd-row ai-center">{restaurant.review}</div>
            <div id="star-container">
              {/* {renderRatingStars(restaurant.review)} */}
            </div>
            <div className="f-title-xlarge-secondary-font-size fw-title-xlarge-secondary-font-weight">
              All ratings (6)
            </div>
          </div>

          <div className="rating-bar-container">
            <div className="rating-bar">
              <div className="star-indicator">
                5 <i className="bi bi-star-fill"></i>
              </div>
              <div className="rectangle-box">
                <div
                  className="fillable-box"
                  style={{ width: `67%`, height: "100%" }}
                />
              </div>
              <div className="percentage">67%</div>
            </div>
            <div className="rating-bar">
              <div className="star-indicator">
                4 <i className="bi bi-star-fill"></i>
              </div>
              <div className="rectangle-box">
                <div
                  className="fillable-box"
                  style={{ width: `33%`, height: "100%" }}
                />
              </div>
              <div className="percentage">33%</div>
            </div>
            <div className="rating-bar">
              <div className="star-indicator">
                3 <i className="bi bi-star-fill"></i>
              </div>
              <div className="rectangle-box">
                <div
                  className="fillable-box"
                  style={{ width: `0%`, height: "100%" }}
                />
              </div>
              <div className="percentage">0%</div>
            </div>
            <div className="rating-bar">
              <div className="star-indicator">
                2 <i className="bi bi-star-fill"></i>
              </div>
              <div className="rectangle-box">
                <div
                  className="fillable-box"
                  style={{ width: `0%`, height: "100%" }}
                />
              </div>
              <div className="percentage">0%</div>
            </div>
            <div className="rating-bar">
              <div className="star-indicator">
                1 <i className="bi bi-star-fill"></i>
              </div>
              <div className="rectangle-box">
                <div
                  className="fillable-box"
                  style={{ width: `0%`, height: "100%" }}
                />
              </div>
              <div className="percentage">0%</div>
            </div>
          </div>
        </div>

        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="name-and-view-more">
              <p>
                <strong>{review.userName}</strong>

                <button
                  className="btn btn-secondary dropdown-toggle dropdown-view-more"
                  type="button"
                  id="dropdownViewMoreButton"
                  onClick={() => toggleDropdown(index)}
                >
                  <i className="bi-three-dots"></i>
                </button>
                <ul
                  className={`dropdown-menu dropdown-view-more ${
                    openDropdownIndex === index ? "show" : ""
                  }`}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleEdit(index)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setDelete(!deleted)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </li>
                </ul>
              </p>
            </div>
            {deleted && (
              <div className="popup-overlay">
                <div className="popup" ref={popRef}>
                  <div>Confirm delete?</div>
                  <div>
                    <button
                      onClick={() => {
                        setConfirm(true);
                        setDelete(false);
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      id="buttonPopupCancel"
                      onClick={() => setDelete(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {confirm && (
              <div classNamec="popup-overlay">
                <div className="popup" ref={popRef}>
                  <i class="bi bi-calendar2-check-fill"></i>
                  <div>Deleted</div>
                </div>
              </div>
            )}
            <span
              className="review-options"
              onClick={() => togglePopup(index)}
            ></span>
            {showDetailsPopups[index] && (
              <div className="review-options-popup">
                <button onClick={() => handleEdit(index)}>
                  {" "}
                  <i className="bi bi-pencil"></i> Edit
                </button>
                <button onClick={() => handleDelete(index)}>
                  {" "}
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            )}

            <div className="d-flex justify-content-start">
              <div>{renderRatingStars(review.rating)}</div>
              <p className="time-post">{review.timePosted}</p>
            </div>

            <p>{review.reviewDescription}</p>
            {review.photoUrl && (
              <img
                src={review.photoUrl}
                alt="Review"
                className="review-photo"
              />
            )}

            <div className="photo-buttons">
              <button
                className="btn-like"
                onClick={() => handleLike(index)}
                style={{ color: hasLiked[index] ? "blue" : "black" }}
              >
                <i
                  className={
                    hasLiked[index]
                      ? "bi bi-hand-thumbs-up-fill"
                      : "bi bi-hand-thumbs-up"
                  }
                ></i>{" "}
                Helpful ({likes[index]})
              </button>

              <div className="dropdown-share">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  onClick={() => toggleShareDropdown(index)}
                >
                  <i className="bi bi-share"></i> Share
                </button>
                <ul
                  className={`dropdown-menu ${
                    isDropdownIndex === index ? "show" : ""
                  }`}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleFacebook(index)}
                    >
                      Share On Facebook
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleEmail(index)}
                    >
                      Share On Email
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
