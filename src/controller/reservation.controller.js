const Reservation = require("../model/reservation.model");

const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, occasion, requests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const reservation = await Reservation.create({
      userId: req.user.id,
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion: occasion || "",
      requests: requests || "",
    });

    res.status(201).json({
      success: true,
      message: "Reservation submitted successfully!",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username email");
    res.status(200).json({
      success: true,
      message: "Reservations fetched successfully",
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value.",
      });
    }

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    reservation.status = status;
    const updated = await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation status updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found." });
    }
    res.status(200).json({ success: true, message: "Reservation deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
};
