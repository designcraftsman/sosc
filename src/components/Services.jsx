import React from "react";
import credit from "../assets/icons/credit.svg";
import learn from "../assets/icons/learn.svg";
import recover from "../assets/icons/recover.svg";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "../context/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  const services = [
    { 
      title: t('servicesSection.cards.credit.title'), 
      text: t('servicesSection.cards.credit.text'), 
      img: credit, 
      link: "/services/crédit"
    },
    { 
      title: t('servicesSection.cards.recovery.title'), 
      text: t('servicesSection.cards.recovery.text'), 
      img: recover, 
      link: "/services/recouvrement"
    },
    { 
      title: t('servicesSection.cards.courses.title'), 
      text: t('servicesSection.cards.courses.text'), 
      img: learn, 
      link: "/services/formations"
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div className="col-3">
            <h2 className="text-primary fs-4 mb-4">{t('servicesSection.title')}</h2>
            <h3 className="fs-3 fw-semibold">{t('servicesSection.subtitle')}</h3>
          </div>
          <div className="row justify-content-evenly col-9">
            {services.map((s, idx) => (
              <ServiceCard 
                key={idx} 
                img={s.img} 
                title={s.title} 
                text={s.text} 
                link={s.link} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
