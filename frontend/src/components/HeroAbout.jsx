import React from "react";
import { useLanguage } from "../context/LanguageContext";

const HeroAbout = () => {
  const { t } = useLanguage();
  return (
    <section className="text-white text-center py-5" style={{ backgroundColor: "#BCB600" }}>
      <div className="container">
        <h2 className="fw-bold">{t('aboutSection.title')}</h2>
        <p className="lead">{t('pages.about.headerText')}</p>
      </div>
    </section>
  );
};

export default HeroAbout;
