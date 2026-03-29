import express from "express";
import { getEvents, createEvent } from "../controllers/eventController.js";
import { markAttendance } from "../controllers/eventController.js";
const router = express.Router();

router.get("/events", getEvents);
router.post("/events", createEvent);
router.post("/events/:id/attendance", markAttendance);
export default router;
