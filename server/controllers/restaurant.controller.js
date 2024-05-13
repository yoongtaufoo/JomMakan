
const Restaurant = require("../models/restaurantModel.js")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const restaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find(); // Query all restaurants
      res.json(restaurants); // Send JSON response
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Internal server error" }); // Send error response
    }
  }


  const restaurantDetails = async(req, res) =>{
    try{
      const restaurant = await Restaurant.findById({"_id": req.params._id})
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant)
    }catch(error){
      console.error(error)
      res.status(500).json({message: "Internal server error"})
    }
  }

  


const addFavouriteRestaurants = async (req, res)=>{
 
  const  favRestaurantId  = req.params.restaurantId;
  console.log(req.params)
  console.log(req.params.value)
  console.log(req.params.restaurantId)
  console.log("Request body:", req.body);
    console.log("Saving restaurant...");
    if (!favRestaurantId) {
      return res.status(400).json({ message: "favRestaurantId is missing in the request body" });
    }

    try {
      // Get token
      const authHeader = req.headers.authorization;
      const token = JSON.parse(authHeader);
  
      // Get the userId from the decoded token
      const userId = token.user._id;
      console.log(userId)
  
      //Find user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

       // Add the new reservation to the user's reservations array
    user.favRestaurants.push({
      favRestaurantId: favRestaurantId
    });

    // Save the updated user object with the new reservation
    await user.save();

    res.status(201).json({ message: "Restaurant saved successfully" });
  } catch (err) {
    console.error("Error saving restaurant:", err);
    res.status(500).json({ message: "Failed to save restaurant" });
  }
}
    
// const fetchFavRestaurants = async (req, res) => {
//   try {
//     // Get token
//     const authHeader = req.headers.authorization;
//     const token = JSON.parse(authHeader);
//     // const token = authHeader.split(' ')[1];

//     // Decode token to get userId
//     // const decodedToken = jwt.verify(token, 'your_secret_key_here');
//     // const userId = decodedToken.user._id;

//     // Get the userId from the decoded token
//     const userId = token.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const favRestaurants = await Restaurant.find({ _id: { $in: user.favRestaurants } });
//     // const favRestaurants = await Restaurant.find({ _id: { $in: user.favRestaurants.map(restaurant => restaurant._id) } });

//     res.json(favRestaurants);

//   } catch (err) {
//     console.error("Error fetching favRestaurants:", err);
//     res.status(500).json({ message: "Failed to fetch favRestaurants" });
//   }
// };


// const fetchFavRestaurants = async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming you have user information attached to the request

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const favRestaurants = await Restaurant.find({ _id: { $in: user.favRestaurants } });
//     res.json(favRestaurants);
//   } catch (err) {
//     console.error("Error fetching favorite restaurants:", err);
//     res.status(500).json({ message: "Failed to fetch favorite restaurants" });
//   }
// };
 


module.exports = {
  restaurants,
  restaurantDetails,
  // fetchFavRestaurants,
  addFavouriteRestaurants
 
};
