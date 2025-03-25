import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./pages/Landing";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";
import { NavBar } from "./components/NavBar";
import Login from "./pages/Login";
import { OpenMed } from "./pages/OpenMed";

export const App = () => {
  const url = "http://localhost:5001/";
  const location = useLocation();
  const showNavBar = !["/signup", "/", "/login"].includes(location.pathname);
  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp api={url} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/openmed" element={<OpenMed api={url} />} />
      </Routes>
    </div>
  );
};
