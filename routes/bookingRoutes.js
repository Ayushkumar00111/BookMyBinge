import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { getUserBookings } from "../controllers/bookingController.js";
const router = express.Router();
router.get("/users/:id/bookings", getUserBookings);
router.post("/bookings", createBooking);

export default router;