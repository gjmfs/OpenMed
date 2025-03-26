import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter } from "react-router-dom";

/*Importing styles*/
import "./styles/Landing.css";
import "./styles/SignUp.css";
import "./styles/index.css";
import "./styles/Home.css";
import "./styles/OpenMed.css";
import "./styles/App.css";
import "./styles/NavBar.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
