import React from "react";
import { CiPhone } from "react-icons/ci";

const Header = ({ title, text, backgroundImage, height = "500px", overlay = 0.55 }) => {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,${overlay}), rgba(0,0,0,${overlay})), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: height,
      }}
    >
      <div className="container mt-5">
        <div className="col-md-5 header-animated">
          <div className="icon-underline mb-5"></div>
          <h2 className="fw-bold fs-3 typewriter">{title}</h2>
          <p className="fs-4 fw-light fade-in-delayed">{text}</p>
        </div>
      </div>
    </section>
  );
};

export default Header;
