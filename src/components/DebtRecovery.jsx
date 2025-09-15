import React from "react";
import { FaSyncAlt } from "react-icons/fa";
import Negotiation from '../assets/icons/negotiation.svg';
import Friendly from '../assets/icons/friendly.svg';
import Direction from '../assets/icons/direction.svg';
import Analyze from '../assets/icons/analyze.svg';
import BookMark from '../assets/icons/bookmark.svg';


const DebtRecovery = () => {
  const services = [
    { 
      icon: Analyze,
      title: "Analyse des créances en souffrance",
      text: "Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.",
    },
    {
      icon: Direction,
      title: "Cadrage",
      text: "Définition des priorités, objectifs et plan d’action pour structurer les opérations de recouvrement.",
    },
    {
      icon: Friendly,
      title: "Relance amiable",
      text: "Mise en place d’un suivi structuré pour rappeler vos débiteurs, prévenir les retards et éviter l’escalade des conflits.",
    },
    {
      icon: Negotiation,
      title: "Négociation de règlement",
      text: "Nous facilitons les négociations pour obtenir des paiements partiels ou des échéanciers adaptés.",
    },
    {
      icon: BookMark,
      title: "Suivi personnalisé",
      text: "Un suivi transparent et constant pour vous tenir informé de l’avancement du recouvrement et des actions entreprises.",
    },
  ];

  return (
    <section className="py-5 debt-section">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-md-5 mx-auto">
            <h5 className="text-primary fw-semibold mb-4">
              Nos services de recouvrement
            </h5>
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
