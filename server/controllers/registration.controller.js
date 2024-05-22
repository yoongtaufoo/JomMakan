const jwt = require("jsonwebtoken");
const User  = require("../models/userModel");
const Registration = require("../models/registrationModel");
const Workshop = require("../models/workshopModel");


// POST registration
const add_register = async (req, res) => {
    const {
      name,
      phone,
      pax,
      status,
      workshop_id,
    } = req.body;
  
    try {
      const authHeader = req.headers.authorization; // Get token
      const token = JSON.parse(authHeader);
  
      const userId = token.user._id; // Get the userId from the decoded token

      // Create a new user ans dave to db
      const newRegistration = new Registration({
        name,
        phone,
        pax,
        status,
        workshop_id,
        user_id: userId,
      });
      await newRegistration.save();
       // Find the workshop by ID and update the available slots
    const workshop = await Workshop.findById(workshop_id);
    if (workshop) {
      workshop.availableSlot -= pax; // Decrement the available slots by the number of participants
      workshop.registered.push(userId); // Set the registered status to true 
      await workshop.save(); // Save the updated workshop
    }
    
      res.status(201).json({ message: "Registration created successfully" });
    } catch (err) {
      console.error("Error creating registration:", err);
      res.status(500).json({ message: "Failed to create registration" });
    }
  };

  // Get registrations
  const myregistration = async (req, res) => {
    try {
      const authHeader = req.headers.authorization; // Get token
      const token = JSON.parse(authHeader);
  
      const userId = token.user._id; // Get the userId from the decoded token
  
      const registrations = await Registration.find({ user_id: userId }).populate('workshop_id'); // Find registrations with user_id = userId and populate workshop_id
  
      // Sort registrations by the workshop date
      registrations.sort((a, b) => new Date(a.workshop_id.date) - new Date(b.workshop_id.date));
  
      // Update status based on current date
      const currentDateTime = new Date();
      for (const registration of registrations) {
        const workshop = registration.workshop_id;
        if (new Date(workshop.date) < currentDateTime && registration.status !== "C") {
          registration.status = "D"; // Past reservations will have status "D" meaning "Completed" // C means cancelled
          await registration.save(); // Save the changes
        }
      }
  
      res.json(registrations); // Send sorted reservations array as response
      
    } catch (err) {
      console.error("Error fetching reservation:", err);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  };

  // Cancel registration
const cancel_register = async (req, res) => {
  const { registrationsId } = req.params; // Get registrationId

  try {
    const registration = await Registration.findById(registrationsId ); // Find the registration by registrationId

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = "C"; // Update the status of the reservation to "Cancelled"
    await registration.save(); // Save the changes

      // Find the workshop by ID and update the available slots
      const workshop = await Workshop.findById(registration.workshop_id);
      if (workshop) {
        workshop.availableSlot += registration.pax; // Increment the available slots by the number of participants
        workshop.registered.pull(registration.user_id); // Remove the user id
        await workshop.save(); // Save the updated workshop
      }

   res.json({ 
      message: "Registration cancelled successfully", 
      registrationId: registration ,
      userId: registration.user_id 
    });
  } catch (error) {
    console.error("Error cancelling registration:", error);
    res.status(500).json({ message: "Failed to cancel registration" });
  }
};

// const cancel_register = async (req, res) => {
//   const { registrationId } = req.params; // Get registrationId from URL parameters

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // Find the registration by registrationId
//     const registration = await Registration.findById(registrationId).session(session);

//     // Check if the registration exists
//     if (!registration) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(404).json({ message: "Registration not found" });
//     }

//     // Update the status of the reservation to "Cancelled"
//     registration.status = "C";
//     await registration.save({ session });

//     // Find the workshop by ID
//     const workshop = await Workshop.findById(registration.workshop_id).session(session);

//     // Check if the workshop exists
//     if (workshop) {
//       // Increment the available slots by the number of participants
//       workshop.availableSlot += registration.pax;

//       // Remove the user from the registered list
//       workshop.registered.pull(registration.user_id);

//       await workshop.save({ session }); // Save the updated workshop
//     }

//     await session.commitTransaction();
//     session.endSession();

//     // Send success response
//     res.json({ message: "Registration cancelled successfully" });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();

//     // Log the error and send failure response
//     console.error("Error cancelling registration:", error);
//     res.status(500).json({ message: "Failed to cancel registration" });
//   }
// };

const findRegistrationsById = async (req, res) => {
  const { workshopId} = req.query; // Get workshopId and date


  try {
    const registrations = await Registration.find({
      workshop_id: workshopId
      //2024-05-13T00:00:00.000+00:00
    });
    console.log(registrations );
    res.json(registrations );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

  module.exports = {
    add_register,
    myregistration,
    cancel_register,
    findRegistrationsById
  };