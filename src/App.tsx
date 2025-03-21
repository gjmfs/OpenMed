import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};
