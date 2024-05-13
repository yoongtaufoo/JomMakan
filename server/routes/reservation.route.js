const express = require("express");
const {
    reserve,
    myreservations,
    cancel,
    findReservationsByDateAndId
} = require("../controllers/reservation.controller.js");

const router = express.Router();

router.post("/reserve", reserve);
router.get("/myreservations", myreservations);
router.put("/:reservationId/cancel", cancel);
router.get("/reservations", findReservationsByDateAndId);

module.exports = router;
