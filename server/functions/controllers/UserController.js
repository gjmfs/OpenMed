const admin = require("firebase-admin");
const User = require("../model/User");

const signup = async (req, res) => {
  const idToken = await req.body.token;
  console.log("Token:", idToken);

  if (!idToken) {
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
    User.create({ uid: uid, email: email, name: name, profile: profile })
      .then((data) => res.json(data))
      .catch((err) => {
        console.error("Error during user creation:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    return res.status(200).json({ message: "User authenticated", user });
  }
};
module.exports = { signup };
