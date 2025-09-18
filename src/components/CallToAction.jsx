import React from "react";
import ctaBg from "../assets/images/contact/contact-section-bg.png";
import { CiPhone } from "react-icons/ci";
import { FiArrowUpRight, FiArrowUpLeft } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CallToAction = () => {
  const { t, dir } = useLanguage();
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
      <div className="container ">
        <h4 className="fw-bold col-6 fs-1" >{t('cta.heading')}</h4>
        <a
          href="#contact"
          className="btn mt-3 btn-secondary text-white rounded-pill px-3 fw-bold fs-5"
        >
          {dir === 'rtl' ? (
            <>
              <FiArrowUpLeft className="mx-2 fs-4" />
              {t('cta.button')}
            </>
          ) : (
            <>
              {t('cta.button')}
              <FiArrowUpRight className="mx-2 fs-4" />
            </>
          )}
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
