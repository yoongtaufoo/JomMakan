const express = require("express");
const {
    reserve,
    reservations,
    cancel
} = require("../controllers/reservation.controller.js");

const router = express.Router();

router.post("/reserve", reserve);
router.get("/reservations", reservations);
router.put("/:reservationId/cancel", cancel);

module.exports = router;
