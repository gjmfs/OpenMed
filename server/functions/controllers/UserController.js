const admin = require("firebase-admin");
const User = require("../model/User");

const signup = async (req, res) => {
  const idToken = await req.body.token;
  const userType = await req.body.user;
  console.log("Token:", idToken);

  if (!idToken && !userType) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  console.log("Decoded Token:", decodedToken);
  const uid = decodedToken.uid;
  const email = decodedToken.email;
  const name = decodedToken.name;
  const profile = decodedToken.picture;

  console.log(uid, email, name, profile);

  let user = await User.findOne({ uid: uid });
  console.log(user);

  if (user === null) {
    User.create({
      uid: uid,
      email: email,
      name: name,
      profile: profile,
      userType: userType,
    })
      .then((data) => {
        res.json(data);
        console.log("new user:", data);
      })
      .catch((err) => {
        console.error("Error during user creation:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    return res.status(200).json(user);
  }
};

const login = async (req, res) => {
  const idToken = await req.body.token;
  const userType = await req.body.user;

  if (!idToken && !userType) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const uid = decodedToken.uid;

  await User.findOne({ uid: uid })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => res.json(err));
};

module.exports = { signup, login };
