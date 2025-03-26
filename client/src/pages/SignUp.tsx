import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import DigitalHealth from "../assets/Images/digitalHealth.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";

const SignUp = (props: SignUpProps) => {
  const [user, setUser] = useState("user");
  const navigate = useNavigate();
  const handleSetUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();
      console.log(user);
      const response = await axios.post(`${props.api}signup`, {
        token,
        user,
      });

      // Access the response data

      const userData = await response.data;
      console.log(userData);
      sessionStorage.setItem("userData", JSON.stringify(userData));
      console.log("User Data:", userData);

      if (sessionStorage.getItem("userData")) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="SignUp">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <img src={DigitalHealth} className="img-fluid" alt="Healthcare" />
          </div>

          <select name="dropdown" value={user} onChange={handleSetUser}>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>

          <div className="col">
            <button onClick={handleGoogleSignIn}>
              <FcGoogle style={{ marginRight: "8px" }} /> Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
interface SignUpProps {
  children?: React.ReactNode;
  api?: string;
  // Add other props here
}
