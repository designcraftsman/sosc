import React from "react";
import mission from '../assets/images/about/mission.jpg';
import { useLanguage } from "../context/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();
  return (
    <section className="my-5 py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fs-4 text-primary mb-4">{t('mission.title')}</h3>
            <h5 className="fw-semibold fs-3">{t('mission.subtitle')}</h5>
            <p>{t('mission.paragraph')}</p>
          </div>
          <div className="col-md-5 mx-auto">
            <img src={mission} alt="Mission" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
