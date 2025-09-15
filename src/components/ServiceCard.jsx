import React from "react";

const ServiceCard = ({ img, title, text, link }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className="h-100 p-3 border border-1 service-card">
        <img
          src={img}
          alt={title}
          className="mb-2 d-block"
          style={{ width: "60px", height: "60px", objectFit: "contain" }}
        />

        {/* Barre verte sous l’icône */}
        <div className="icon-underline mb-3"></div>

        <h5 className="fw-bold fs-5">{title}</h5>
        <p className="fs-6 fw-light">{text}</p>
        <a href={link} className="text-decoration-underline">
          En savoir plus
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
