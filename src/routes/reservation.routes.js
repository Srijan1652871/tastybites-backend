const express = require("express");
const authentication = require("../middleware/authentication.middleware");
const {
  createReservation,
  getAllReservations,
  updateReservationStatus,
} = require("../controller/reservation.controller");

const router = express.Router();

// Requires login to make a reservation
router.post("/", authentication, createReservation);

// Admin protected routes
router.get("/admin", authentication, getAllReservations);
router.put("/admin/:id", authentication, updateReservationStatus);

module.exports = router;

