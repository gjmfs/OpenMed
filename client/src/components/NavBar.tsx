import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";
import OpenMed from "../assets/icons/OpenMedLight.png";

export const NavBar = () => {
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

  console.log(profile);

  return (
    <nav>
      <NavLink to="/home">
        <img id="logo" src={OpenMed} alt="logo" />
      </NavLink>
      <input type="checkbox" id="sidebar-active" />
      <label htmlFor="sidebar-active" className="open-sidebar-button">
        <img className="icons" src={menu} />
      </label>
      <label htmlFor="sidebar-active" id="overlay"></label>
      <div className="links-container">
        <label htmlFor="sidebar-active" className="close-sidebar-button">
          <img className="icons" src={close} />
        </label>
        <NavLink className="title" to="/home">
          Home
        </NavLink>
        <NavLink className="title" to="/openmed">
          Chat with OpenMed
        </NavLink>
        <NavLink className="title" to="/book">
          Book a Doctor
        </NavLink>
        <NavLink className="title" to="/history">
          History
        </NavLink>
        <img className="profile" src={profile || ""} alt="user-profile" />
      </div>
    </nav>
  );
};
