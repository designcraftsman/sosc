import React from "react";
import courseImage from '../assets/images/formations/formationIntro.jpg';
import { useLanguage } from "../context/LanguageContext";

const CoursesIntro = () => {
  const { t } = useLanguage();
  return (
    <section className="training-intro py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mx-auto">
            <h2 className="text-primary fw-semibold fs-4 mb-4">{t('coursesIntro.heading')}</h2>
            <p>{t('coursesIntro.p1')}</p>
            <p>{t('coursesIntro.p2')}</p>
            <p>{t('coursesIntro.p3')}</p>
          </div>
          <div className="col-md-5 mx-auto">
            <img
              src={courseImage}
              alt="Formation en recouvrement"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesIntro;
