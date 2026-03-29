import dotenv from "dotenv";
import express from "express";
import pool from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
dotenv.config();
app.use(express.json());

const swaggerDoc = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use("/", eventRoutes);

app.use("/", bookingRoutes);
app.get("/", (req, res) => {
  res.send("Api Running On GET Request");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ message: "DB connected " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});