import pool from "../config/db.js";


export const getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events WHERE date > NOW()"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { title, description, date, total_capacity } = req.body;

    if (!title || !date || !total_capacity) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await pool.query(
      "INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)",
      [title, description, date, total_capacity, total_capacity]
    );

    res.json({ message: "Event created " });
  } catch (err) {
    res.status(500).json({ error: err.message ,reuslt:"kuch nhi milss"});
  }
};
export const markAttendance = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code required" });
    }

    const [booking] = await pool.query(
      "SELECT tickets_booked FROM bookings WHERE booking_code=? AND event_id=?",
      [code, eventId]
    );

    if (booking.length === 0) {
      return res.status(404).json({ error: "Invalid code" });
    }

    await pool.query(
      "INSERT INTO attendance (event_id, booking_code) VALUES (?, ?)",
      [eventId, code]
    );

    res.json({
      message: "Entry allowed ",
      tickets: booking[0].tickets_booked,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};