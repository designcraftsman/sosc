import React from "react";
import ctaBg from "../assets/images/contact/contact-section-bg.png";
import { CiPhone } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CallToAction = () => {
  const { t } = useLanguage();
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
        <h4 className="fw-bold col-6 fs-1" >{t('cta.heading')}</h4>
        <a
          href="#contact"
          className="btn mt-3 btn-secondary text-white rounded-pill px-3 fw-bold fs-5"
        >
          {t('cta.button')}
          <FiArrowUpRight className="ms-2 fs-4" />

        </a>
      </div>
    </section>
  );
};

export default CallToAction;
