const express = require("express");
const {
    add_register,
    myregistration,
    cancel_register,
    findRegistrationsById
} = require("../controllers/registration.controller.js");

// cancel,
// findReservationsByDateAndId
const router = express.Router();

router.post("/new_registration", add_register);
router.get("/my_registrations", myregistration);
router.put("/:registrationsId/cancel", cancel_register);
router.get("/registrations", findRegistrationsById);

module.exports = router;