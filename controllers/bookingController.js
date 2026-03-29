import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createBooking = async (req, res) => {
  const { user_id, event_id, tickets } = req.body;

  if (!user_id || !event_id || !tickets) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();


    const [event] = await conn.query(
      "SELECT remaining_tickets FROM events WHERE id=? FOR UPDATE",
      [event_id]
    );

    if (event.length === 0) {
      throw new Error("Event not found");
    }

    if (event[0].remaining_tickets < tickets) {
      throw new Error("Not enough tickets");
    }

    const bookingCode = uuidv4();

  
    await conn.query(
      "INSERT INTO bookings (user_id, event_id, booking_code, tickets_booked) VALUES (?, ?, ?, ?)",
      [user_id, event_id, bookingCode, tickets]
    );

    
    await conn.query(
      "UPDATE events SET remaining_tickets = remaining_tickets - ? WHERE id=?",
      [tickets, event_id]
    );

    await conn.commit();

    res.json({
      message: "Booking successful ",
      bookingCode,
    });
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
};
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await pool.query(
      `SELECT b.id, b.booking_code, b.tickets_booked, e.title, e.date
       FROM bookings b
       JOIN events e ON b.event_id = e.id
       WHERE b.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};