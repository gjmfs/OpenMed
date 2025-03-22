require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./model/User");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

const corsOptions = {
  origin: "https://e7e7-43-252-15-140.ngrok-free.app", // Allow only your ngrok URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request from: ${req.ip}`); // Log the IP
  next();
});

app.post("/api/verify-token", async (req, res) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name;
    const profile = decodedToken.picture;

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, name, profile });
      await user.save();
      return res
        .status(201)
        .json({ message: "User created and authenticated", user });
    } else {
      return res.status(200).json({ message: "User authenticated", user });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    if (error.code === "auth/id-token-expired") {
      return res.status(401).json({ error: "Token expired" });
    } else if (error.code === "auth/argument-error") {
      return res.status(400).json({ error: "Invalid token format" });
    }
    return res.status(401).json({ error: "Unauthorized" });
  }
});

const port = process.env.PORT || 4001;
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
