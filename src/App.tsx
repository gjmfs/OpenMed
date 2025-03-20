import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

export const App = () => {
  return (
    <div className="App">
      <h2>App</h2>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};
