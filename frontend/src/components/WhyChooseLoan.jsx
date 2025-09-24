import React from "react";
import experience from '../assets/icons/experience.svg';
import adaptive from '../assets/icons/adaptive.svg';
import partner from '../assets/icons/partner.svg';
import follow from '../assets/icons/follow.svg';
import WhyLoan from '../assets/images/crédit/whyChooseLoan.jpg';
import { useLanguage } from "../context/LanguageContext";



const WhyChooseLoan = () => {
  const { t } = useLanguage();
  const bullets = t('whyChooseLoan.bullets');
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image encadrée */}
          <div className="col-md-6 position-relative">
            <div className="border border-success p-2 d-inline-block">
              <img
                src={WhyLoan}
                alt="Why choose us"
                className="img-fluid"
              />
            </div>
          </div>
          {/* Texte + icônes */}
          <div className="col-md-6">
            <h5 className="text-primary fs-4 mb-4 fw-semibold">
              {t('whyChooseLoan.title')}
            </h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center"><img src={experience} alt="Experience" className="me-2" /><p className="m-0">{bullets[0]}</p></li>
              <li className="mb-3 d-flex align-items-center"><img src={adaptive} alt="Adaptive" className="me-2" /><p className="m-0">{bullets[1]}</p></li>
              <li className="mb-3 d-flex align-items-center"><img src={partner} alt="Partner" className="me-2" /><p className="m-0">{bullets[2]}</p></li>
              <li className="d-flex align-items-center"><img src={follow} alt="Follow" className="me-2" /><p className="m-0">{bullets[3]}</p></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoan;
