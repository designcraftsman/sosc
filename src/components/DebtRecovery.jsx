import React from "react";
import { FaSyncAlt } from "react-icons/fa";
import Negotiation from '../assets/icons/negotiation.svg';
import Friendly from '../assets/icons/friendly.svg';
import Direction from '../assets/icons/direction.svg';
import Analyze from '../assets/icons/analyze.svg';
import BookMark from '../assets/icons/bookmark.svg';
import { useLanguage } from "../context/LanguageContext";


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
          <div className="col-md-5 mx-auto position-relative">
            <div className="about-images">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Main"
                className="img-fluid main-img rounded"
              />
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Secondary"
                className="img-fluid secondary-img rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebtRecovery;
