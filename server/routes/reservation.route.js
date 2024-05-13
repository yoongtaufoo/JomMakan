const express = require("express");
const {
    reserve,
    myreservations,
    cancel,
    findReservationsByDate
} = require("../controllers/reservation.controller.js");

const router = express.Router();

router.post("/reserve", reserve);
router.get("/myreservations", myreservations);
router.put("/:reservationId/cancel", cancel);
router.get("/reservations", findReservationsByDate);

module.exports = router;
