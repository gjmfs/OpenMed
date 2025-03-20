require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const mongoose = require("mongoose");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

app.post("/api/verify-token", async (req, res) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email });
      await user.save();
      return res
        .status(201)
        .json({ message: "User created and authenticated", user });
    } else {
      return res.status(200).json({ message: "User authenticated", user });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
