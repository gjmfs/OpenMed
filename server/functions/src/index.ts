import * as functions from "firebase-functions";
import express from "express";
import * as admin from "firebase-admin";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Import Routes
import { OpenRouter } from "./routes/OpenMedRoutes";
import { UserRouter } from "./routes/UserRoutes";

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello from Express!");
});
app.use("/openmed", OpenRouter);
app.use(UserRouter);

// Monitoring incoming requests
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`Incoming request from: ${req.ip}`);
    next();
  }
);

// Connect to MongoDB and start the server within the Firebase Function
exports.app = functions.https.onRequest(async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("MongoDB Connected");

    // Use the Express app to handle the request
    app(req, res);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.status(500).send("Database connection failed.");
  }
});
