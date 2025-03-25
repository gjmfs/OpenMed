const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env

// Import Routes
const OpenMedRouter = require("./routes/OpenMedRoutes");
const UserRouter = require("./routes/UserRoutes");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Adjust path if needed
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use("/openmed", OpenMedRouter);
app.use(UserRouter);

// Monitoring incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request from: ${req.ip}`);
  next();
});

// Serve static files (Firebase Hosting is recommended for static files)
// This is for demonstration, and not recommended for production.
// const staticPath = path.join(__dirname, "dist");
// app.use(express.static(staticPath));

// Handle all other requests by serving the index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(staticPath, "index.html"));
// });

// Connect to MongoDB and start the server within the Firebase Function
exports.app = functions.https.onRequest(async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected");

    // Handle the request using the express app
    app(req, res); // Pass the request to the express app
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.status(500).send("Database connection failed.");
  }
});
