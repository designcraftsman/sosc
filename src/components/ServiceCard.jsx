import React from "react";
import { useLanguage } from "../context/LanguageContext";

const ServiceCard = ({ img, title, text, link }) => {
  const { t } = useLanguage();
  return (
    <div className="col-md-3 mb-3">
      <div className="h-100 p-3 border border-1 service-card d-flex flex-column ">
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
        <div className="mt-auto">
        <a href={link} className="text-decoration-underline "> 
          {t('common.learnMore')}
        </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
