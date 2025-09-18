import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fs-4 text-primary mb-4">{t('mission.title')}</h3>
            <h5 className="fw-semibold fs-3">{t('mission.subtitle')}</h5>
            <p>{t('mission.paragraph')}</p>
          </div>
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Mission" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
