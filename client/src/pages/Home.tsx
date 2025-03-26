import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userType, setUserType] = useState();

  const navigate = useNavigate();
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userDataString = sessionStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.profile) {
          setProfile(userData.profile);
        } else {
          setProfile(null); // Set to null if profile is missing or empty
        }
        if (!userData) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="Home">
      <h1>Welcome to OpenMed</h1>
      {userType && userType ? <h2>Hello, {userType}</h2> : <h2>Hello, User</h2>}
      <p>Get started with your doctor consultation</p>
    </div>
  );
};
