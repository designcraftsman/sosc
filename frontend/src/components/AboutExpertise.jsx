import React from 'react';
import credit from "../assets/icons/credit.svg";
import learn from "../assets/icons/learn.svg";
import recover from "../assets/icons/recover.svg";
import { useLanguage } from "../context/LanguageContext";

const AboutExpertise = () => {
  const { t, dir } = useLanguage();
  const items = [
    { key: 'credit', icon: credit },
    { key: 'recover', icon: recover },
    { key: 'learn', icon: learn },
  ];

  return (
    <div className="container my-5" dir={dir}>
      <h2 className="text-primary fs-4 fw-semidbold mb-4">{t('aboutExpertise.title')}</h2>
      <ul className="list-unstyled">
        {items.map(({ key, icon }, idx) => (
          <li className="mb-4" key={key}>
            <div className={`d-flex align-items-start ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <img src={icon} alt={t(`aboutExpertise.items.${key}.alt`)} className={`${dir === 'rtl' ? 'ms-2' : 'me-2'}`} />
              <span>{t(`aboutExpertise.items.${key}.text`)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutExpertise;
