import heart from "../assets/Images/heart.jpg";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div
      className="text-white"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#161616",
      }}
    >
      {/* Header */}
      <header className="container mt-4 d-flex justify-content-end landing-buttons">
        <Link to={"/signup"} className="btn btn-outline-light me-2">
          SignUp
        </Link>
        <Link to={"/login"} className="btn btn-outline-light">
          SignIn
        </Link>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        {/* Text Area */}
        <div className="text-center mb-4 ">
          <p>
            Wel come to the future of healthcare. <br />
            Open<span style={{ color: "purple" }}>Med</span> is a platform that
            provides you doctor consultation at your fingertips.
          </p>
        </div>

        <div className="row text-center row-cols-1 row-cols-md-2">
          <div className="col d-flex align-items-center">
            <h1
              className="display-4 fw-bold text-center mb-4"
              style={{ fontFamily: "monospace" }}
            >
              Open<span style={{ color: "purple" }}>Med</span>
            </h1>
          </div>
          <div className="col">
            <img
              src={heart}
              alt="Neon Heart"
              style={{
                width: "30vw",
                height: "auto",
                mixBlendMode: "lighten",
                filter: "drop-shadow(10 0 10px purple)",
              }} // Add neon effect
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="row justify-content-center">
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary text-white p-3">
              <div className="card-body">
                <h5 className="card-title">OpenMed</h5>
                <p className="card-text">
                  An AI assistant that can assist you like a consultant in real
                  time
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary text-white p-3">
              <div className="card-body">
                <h5 className="card-title">How it works</h5>
                <p className="card-text">
                  Let get you started with OpenMed in 3 simple steps.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card bg-secondary text-white p-3">
              <div className="card-body">
                <h5 className="card-title">Support</h5>
                <p className="card-text">
                  We are here to help you 24/7. Feel free to contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
