import React from "react";
import image1 from '../assets/images/about/1.jpg';
import image2 from '../assets/images/about/2.jpg';
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  return (
    <section className="my-5 py-5 about-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Images */}
          <div className="col-md-5 col-10 mx-auto mb-md-0 mb-5 position-relative">
            <div className="about-images">
              <img
                src={image1}
                alt="Main"
                className="img-fluid main-img"
              />
              <img
                src={image2}  
                alt="Secondary"
                className="img-fluid secondary-img "
              />
            </div>
          </div>

          {/* Text */}
          <div className="col-md-6">
            <h3 className="text-primary fs-4 mb-4">{t("aboutSection.title")}</h3>
            <h5 className="fw-semibold fs-3 mb-3">{t("aboutSection.subtitle")}</h5>
            <p className="text-muted">{t("aboutSection.paragraph")}</p>
            <a
              href="#"
              className="btn btn-secondary text-white fw-bold rounded-pill px-4"
            >
              {t("aboutSection.more")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
