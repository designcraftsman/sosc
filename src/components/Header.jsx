import React from "react";
import { CiPhone } from "react-icons/ci";

const Header = ({ title, text, backgroundImage, height = "500px" }) => {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: height,
      }}
    >
      <div className="container mt-5">
        <div className="col-5">
          <div className="icon-underline mb-5"></div>
          <h2 className="fw-bold fs-3">
            {title}
          </h2>
          <p className="fs-4 fw-light">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
