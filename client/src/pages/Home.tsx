import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData") || "");
    console.log(userData);
    setUserType(userData.userType);
    if (!userData) {
      navigate("/signin");
    }
  }, []);

  const [userType, setUserType] = useState();

  return (
    <div className="Home">
      <h1>Welcome to OpenMed</h1>
      {userType && userType ? <h2>Hello, {userType}</h2> : <h2>Hello, User</h2>}
      <p>Get started with your doctor consultation</p>
    </div>
  );
};
