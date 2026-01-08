const express = require("express");
const mysql = require("mysql2/promise");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(express.json());

/* ================== DB CONFIG ================== */
const DB_HOST = "127.0.0.1";
const DB_USER = "root";
const DB_PASS = "newpassword123";
const DB_NAME = "smart_event_booking";

let pool;

/* ================== INIT DATABASE ================== */
async function initDb() {
  const rootPool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  });

  await rootPool.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  await rootPool.end();

  pool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    connectionLimit: 10,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      location VARCHAR(255),
      date DATE,
      price DECIMAL(10,2),
      seats INT,
      description TEXT,
      image LONGBLOB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      eventId INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
    )
  `);

  console.log("✅ MySQL Connected");
}

/* ================== IMAGE HELPER ================== */
const withBase64Image = (row) => ({
  ...row,
  image: row.image
    ? `data:image/jpeg;base64,${row.image.toString("base64")}`
    : null,
});

/* ================== EVENTS API ================== */

// GET ALL EVENTS
app.get("/api/events", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events ORDER BY id DESC");
    res.json(rows.map(withBase64Image));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET EVENT BY ID
app.get("/api/events/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ message: "Not found" });

    res.json(withBase64Image(rows[0]));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE EVENT (IMAGE UPLOAD)
app.post("/api/events", upload.single("image"), async (req, res) => {
  try {
    const { title, location, date, price, seats, description } = req.body;

    const imageBuffer = req.file ? req.file.buffer : null;

    const [result] = await pool.query(
      `INSERT INTO events 
       (title, location, date, price, seats, description, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, location, date, price, seats, description, imageBuffer]
    );

    const [rows] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(withBase64Image(rows[0]));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE EVENT (with image support)
app.put("/api/events/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, location, date, price, seats, description } = req.body;

    // 1️⃣ Get existing image if no new image uploaded
    let currentImage = null;
    if (!req.file) {
      const [rows] = await pool.query(
        "SELECT image FROM events WHERE id = ?",
        [req.params.id]
      );
      if (rows.length) currentImage = rows[0].image;
    }

    const imageBuffer = req.file ? req.file.buffer : currentImage;

    const sqlDate = date ? new Date(date).toISOString().split("T")[0] : null;

    // 2️⃣ Update the event
    await pool.query(
      `UPDATE events SET
         title = ?,
         location = ?,
         \`date\` = ?,
         price = ?,
         seats = ?,
         description = ?,
         image = ?
       WHERE id = ?`,
      [
        title ?? null,
        location ?? null,
        sqlDate,
        price !== undefined ? Number(price) : null,
        seats !== undefined ? Number(seats) : null,
        description ?? null,
        imageBuffer,
        req.params.id,
      ]
    );

    // 3️⃣ Fetch updated event
    const [updatedRows] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [req.params.id]
    );

    res.json(withBase64Image(updatedRows[0]));
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE EVENT
app.delete("/api/events/:id", async (req, res) => {
  await pool.query("DELETE FROM events WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

/* ================== BOOKINGS API ================== */

// CREATE BOOKING
app.post("/api/bookings", async (req, res) => {
  const { eventId } = req.body;

  const [exists] = await pool.query(
    "SELECT id FROM bookings WHERE eventId = ?",
    [eventId]
  );

  if (exists.length)
    return res.status(409).json({ message: "Already booked" });

  await pool.query("INSERT INTO bookings (eventId) VALUES (?)", [eventId]);
  res.status(201).json({ success: true });
});

// GET BOOKINGS
app.get("/api/bookings", async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      b.id AS bookingId,
      e.*
    FROM bookings b
    JOIN events e ON b.eventId = e.id
    ORDER BY b.id DESC
  `);

  const bookings = rows.map((r) => ({
    id: r.bookingId,
    event: withBase64Image(r),
  }));

  res.json(bookings);
});

// DELETE BOOKING
app.delete("/api/bookings/:id", async (req, res) => {
  await pool.query("DELETE FROM bookings WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

/* ================== START SERVER ================== */
initDb().then(() => {
  app.listen(3000, () =>
    console.log("🚀 Server running on http://localhost:3000")
  );
});
