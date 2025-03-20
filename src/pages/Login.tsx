import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();

      const response = await axios.post(
        "http://localhost:3005/api/verify-token",
        {},
        {
          // Empty data object for POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming 'token' is already defined
          },
        }
      );

      // Access the response data

      const userData = await response.data;
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button
        onClick={handleGoogleSignIn}
        className="p-3 bg-gray-400 rounded-md"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
