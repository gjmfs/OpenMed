import { NavLink } from "react-router-dom";

import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";
import OpenMed from "../assets/icons/OpenMedLight.png";

export const NavBar = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData") || "");
  const profile = userData.profile;
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
        <img className="profile" src={profile} alt="user-profile" />
      </div>
    </nav>
  );
};
