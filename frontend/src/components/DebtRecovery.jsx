import React from "react";
import { FaSyncAlt } from "react-icons/fa";
import Negotiation from '../assets/icons/negotiation.svg';
import Friendly from '../assets/icons/friendly.svg';
import Direction from '../assets/icons/direction.svg';
import Analyze from '../assets/icons/analyze.svg';
import BookMark from '../assets/icons/bookmark.svg';
import { useLanguage } from "../context/LanguageContext";
import analyse from '../assets/images/recovery/analyse.jpg';
import guidance from '../assets/images/recovery/guidance.jpg';


const DebtRecovery = () => {
  const { t } = useLanguage();
  const debtItems = t('debtRecovery.items');
  const services = [
    { icon: Analyze, title: debtItems[0].title, text: debtItems[0].text },
    { icon: Direction, title: debtItems[1].title, text: debtItems[1].text },
    { icon: Friendly, title: debtItems[2].title, text: debtItems[2].text },
    { icon: Negotiation, title: debtItems[3].title, text: debtItems[3].text },
    { icon: BookMark, title: debtItems[4].title, text: debtItems[4].text },
  ];

  return (
    <section className="py-5 debt-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="text-primary fw-semibold mb-4">{t('debtRecovery.sectionTitle')}</h5>
            <div className="d-flex flex-column gap-3">
              {services.map((s, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-center p-3 border rounded shadow-sm bg-info"
                >
                  <div className="icon-box me-3">
                    <img src={s.icon} alt={s.title} />
                  </div>
                  <div>
                    <h6 className="fw-bold">{s.title}</h6>
                    <p className="small text-muted mb-0">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image à droite */}
          <div className="col-md-4 col-10 mx-auto mb-md-0 mb-5 position-relative">
            <div className="about-images">
              <img
                src={analyse}
                alt="Main"
                className="img-fluid main-img"
              />
              <img
                src={guidance}  
                alt="Secondary"
                className="img-fluid secondary-img "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebtRecovery;
