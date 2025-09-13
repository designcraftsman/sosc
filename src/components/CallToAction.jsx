import React from "react";
import ctaBg from "../assets/images/contact/contact-section-bg.png";
import { CiPhone } from "react-icons/ci";

const CallToAction = () => {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
      }}
    >
      <div className="container text-start">
        <h4 className="fw-bold col-6 fs-1" >
          Discutons de la manière dont nous pouvons contribuer à améliorer votre
          entreprise.
        </h4>
        <a
          href="#contact"
          className="btn mt-3 btn-secondary text-white rounded-pill px-4 fw-bold fs-5"
        >
          <span className=" me-2"><CiPhone /></span>
          Contactez-nous
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
