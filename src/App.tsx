import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./pages/Landing";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";
import { NavBar } from "./components/NavBar";

export const App = () => {
  const location = useLocation();
  const showNavBar = !["/signup", "/"].includes(location.pathname);
  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};
