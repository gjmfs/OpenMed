import admin from "firebase-admin";
import User from "../model/User";

export const signup = async (req: any, res: any) => {
  const idToken = await req.body.token;
  const userType = await req.body.user;
  console.log("Token:", idToken);

  if (!idToken && !userType) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);
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
        console.log("new user:", data);
        res.json(data);
      })
      .catch((err) => {
        console.error("Error during user creation:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    return res.status(200).json(user);
  }
};

export const login = async (req: any, res: any) => {
  const idToken = await req.body.token;
  console.log(idToken);
  if (!idToken) {
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
