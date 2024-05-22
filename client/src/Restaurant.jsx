import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import "./Restaurant.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";
import axios from "axios";

const renderRatingStars = (rating) => {
  const filledStars = Math.floor(rating);
  const decimalPart = rating - filledStars;
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
  const hasPartialStar = decimalPart >= 0.75;

  return (
    <div className="star-container">
      {[...Array(filledStars)].map((_, index) => (
        <BsStarFill key={index} className="star-icon filled-star" />
      ))}
      {hasHalfStar && (
        <BsStarFill className="star-icon filled-star half-star" />
      )}
      {hasPartialStar && (
        <BsStarFill className="star-icon filled-star partial-star" />
      )}
      {[
        ...Array(5 - filledStars - (hasHalfStar || hasPartialStar ? 1 : 0)),
      ].map((_, index) => (
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
  const [showDetailsPopups, setShowDetailsPopups] = useState(0);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [selectedShareOption, setSelectedShareOption] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(0);
  const [isDropdownIndex, setIsDropdownIndex] = useState(null);

  // Go to the top of page when navigate to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { _id } = useParams();

  const handleFacebook = (index) => {
    console.log("Share on Facebook clicked for review at index:", index);
    setIsDropdownIndex(null);
  };
  const handleEmail = (index) => {
    console.log("Share via email clicked for review at index:", index);
    setIsDropdownIndex(null);
  };

  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]); // Initialize as empty array
  const [ratingPercentages, setRatingPercentages] = useState([0, 0, 0, 0, 0]);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null); // State to hold the selected review for editing
  const [reviewDescription, setReviewDescription] = useState(""); // State to hold the review description

  let userid = "User123";

  // get userid from local storage
  const storedUser = JSON.parse(localStorage.getItem("JomMakanUser"));
  if (storedUser) {
    userid = storedUser.user._id;
  }

  const handleDropdownToggle = (index) => {
    setIsDropdownIndex(isDropdownIndex === index ? null : index);
  };

  const handleEditDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

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

  const handleLike = (index) => {
    console.log(index);
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

  useEffect(() => {
    // let handler = (e) => {
    //   if (popRef.current && !popRef.current.contains(e.target)) {
    //     setDelete(false);
    //   }
    // };

    // document.addEventListener("mousedown", handler);

    // return () => {
    //   document.removeEventListener("mousedown", handler);
    // };

    axios
      .get(`http://localhost:3001/api/restaurant/${_id}`)
      .then(({ data }) => {
        setRestaurant(data);
        if (data.reviews) {
          setHasLiked(new Array(data.reviews.length).fill(false));
          setLikes(new Array(data.reviews.length).fill(0));
        }
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
      });

    // axios
    //   .get(`http://localhost:3001/api/review/${_id}/reviews`)
    //   .then((response) => {
    //     console.log("Fetched reviews:", response.data);
    //     setRestaurantReviews(response.data);
    //     setAverageRating(calculateAverageRating(response.data)); // Set average rating
    //     calculateRatingPercentages(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching reviews:", error);
    //   });

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/review/${_id}/reviews`
        );

        // console.log("Fetched reviews:", response);
        console.log("Fetched reviews:", response.data);
        setRestaurantReviews(response.data);
        setAverageRating(calculateAverageRating(response.data)); // Set average rating
        calculateRatingPercentages(response.data);
      } catch (error) {
        console.error("Error fetch resreview:", error);
      }
    };
    fetchReviews();
  }, [_id]);
  const handleEdit = (index) => {
    const selectedReview = restaurantReviews[index]; // Get the selected review
    // console.log(restaurantReviews[index]);
    setSelectedReview(selectedReview); // Set the selected review in state
    navigate(
      `/restaurant/${_id}/addReview?restaurantName=${restaurant.name}&edit=true`
    ); // Navigate to the AddReview page with edit=true query parameter
  };
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/api/restaurant/${_id}`)
  //     .then(({ data }) => {
  //       setRestaurant(data);
  //       if (data.reviews) {
  //         setHasLiked(new Array(data.reviews.length).fill(false));
  //         setLikes(new Array(data.reviews.length).fill(0));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching restaurant:", error);
  //     });
  // }, [_id]);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3001/api/review/${_id}/reviews`
  //       );
  //       console.log("Fetched reviews:", response.data);
  //       setRestaurantReviews(response.data);
  //       setAverageRating(calculateAverageRating(response.data)); // Set average rating
  //       calculateRatingPercentages(response.data);
  //     } catch (error) {
  //       console.error("Error fetch resreview:", error);
  //     }
  //   };
  //   fetchReviews();
  // }, [_id]);

  // useEffect(() => {
  //   const token = localStorage.getItem("JomMakanUser");

  //   if (!token) {
  //     alert("User is not authenticated.");
  //     return;
  //   }

  //   axios
  //     .get(`http://localhost:3001/api/restaurant/${_id}/reviews`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then(({ data }) => {
  //       setRestaurantReviews(data);
  //       setRestaurantReviews(response.data);
  //       setAverageRating(calculateAverageRating(response.data)); // Set average rating
  //       calculateRatingPercentages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching revieww:", error);
  //     });
  // }, []);

  const calculateRatingPercentages = (reviews) => {
    const total = reviews.length;
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRatings / total;
    const percentages = [0, 0, 0, 0, 0].map((_, index) => {
      const rating = index + 1;
      const count = reviews.filter(
        (review) => Math.floor(review.rating) === rating
      ).length;
      return (count / total) * 100;
    });
    setRatingPercentages(percentages);
  };

  const calculateAverageRating = (reviews) => {
    const total = reviews.length;
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return total > 0 ? totalRatings / total : 0;
  };
  const getTimeDifferenceString = (timePosted) => {
    const currentTime = new Date();
    const postedTime = new Date(timePosted);
    const timeDifference = Math.floor((currentTime - postedTime) / 1000); // Time difference in seconds

    if (timeDifference < 60) {
      return "now"; // If less than a minute ago
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`; // If less than an hour ago
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`; // If less than a day ago
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`; // If more than a day ago
    }
  };

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
          <i className="bi bi-egg-fried custom-icon"></i>
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
            <Link
              to={`/restaurant/${_id}/addReview?restaurantName=${restaurant.name}`}
            >
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
            <div id="star-container">
              <div className="rating-value">{averageRating.toFixed(1)}</div>

              <div className="rating-star-colour">
                {renderRatingStars(averageRating)}
              </div>
            </div>
            <br />
            <div className="f-title-xlarge-secondary-font-size fw-title-xlarge-secondary-font-weight">
              All ratings ({restaurantReviews.length})
            </div>
          </div>{" "}
          <div className="rating-bar-container">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div className="rating-bar" key={index}>
                <div className="star-indicator">
                  {rating} <i className="bi bi-star-fill"></i>
                </div>
                <div className="rectangle-box">
                  <div
                    className="fillable-box"
                    style={{
                      width: `${Math.round(ratingPercentages[5 - index - 1])}%`,
                      height: "100%",
                    }}
                  />
                </div>
                <div className="percentage">
                  {ratingPercentages[5 - index - 1].toFixed(0)}%
                </div>
              </div>
            ))}{" "}
          </div>
        </div>

        {restaurantReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="name-and-view-more">
              <p>
                <strong>{review.userName}</strong>

                <button
                  className="btn btn-secondary dropdown-toggle dropdown-view-more"
                  type="button"
                  // id="dropdownViewMoreButton"
                  onClick={() => handleEditDropdownToggle(index)}
                >
                  <i className="bi-three-dots"></i>
                </button>
                <ul
                  className={`dropdown-menu dropdown-view-more ${
                    openDropdownIndex === index ? "show" : ""
                  }`}
                >
                  <li>
                    <Link
                      to={`/restaurant/${_id}/addReview?edit=true?restaurantName=${restaurant.name}`}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => handleEdit(index)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    </Link>
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
                  <i className="bi bi-calendar2-check-fill"></i>
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
                  <i className="bi bi-pencil"></i> Edit
                </button>
                <button onClick={() => handleDelete(index)}>
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            )}

            <div className="d-flex justify-content-start">
              <div>{renderRatingStars(review.rating)}</div>&nbsp;&nbsp;
              <p className="time-post">
                {getTimeDifferenceString(review.timePosted)}
              </p>
            </div>

            <p>{review.reviewDescription}</p>
            {review.mediaUrl && (
              <img
                src={review.mediaUrl}
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
                  onClick={() => handleDropdownToggle(index)}
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
