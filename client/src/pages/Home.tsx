import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData") || "");
    console.log(userData);
    setName(userData.name);
    if (!userData) {
      navigate("/signin");
    }
  }, []);

  const [name, setName] = useState();

  return (
    <div className="Home">
      <h1>Welcome to OpenMed</h1>
      {name && name ? <h2>Hello, {name}</h2> : <h2>Hello, User</h2>}
      <p>Get started with your doctor consultation</p>
    </div>
  );
};
