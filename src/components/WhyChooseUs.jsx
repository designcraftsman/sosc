import React from "react";
import { useLanguage } from "../context/LanguageContext";
import whychooseus from '../assets/images/about/why-choose-us.jpg';

const WhyChooseUs = () => {
  const { t } = useLanguage();
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">  
          <div className="col-5 mx-auto">
            <img src={whychooseus} className="img-fluid" alt="" />
          </div>
          <div className="col-5 mx-auto">
          <h3 className="fw-semibold mb-4 fs-4 text-primary">{t('whyChooseUs.title')}</h3>
            <ul className="">
              <li className="mb-3 fs-6 fw-medium">{t('whyChooseUs.bullets.0')}</li>
              <li className="mb-3 fs-6 fw-medium">{t('whyChooseUs.bullets.1')}</li>
              <li className="mb-3 fs-6 fw-medium">{t('whyChooseUs.bullets.2')}</li>
            </ul>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default WhyChooseUs;
