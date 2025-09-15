import React from "react";
import { FaSyncAlt } from "react-icons/fa";

const DebtRecovery = () => {
  const services = [
    {
      title: "Analyse des créances en souffrance",
      text: "Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.",
    },
    {
      title: "Cadrage",
      text: "Définition des priorités, objectifs et plan d’action pour structurer les opérations de recouvrement.",
    },
    {
      title: "Relance amiable",
      text: "Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.",
    },
    {
      title: "Négociation de règlement",
      text: "Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.",
    },
    {
      title: "Suivi personnalisé",
      text: "Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.",
    },
  ];

  return (
    <section className="py-5 debt-section">
      <div className="container">
        {/* Bloc haut */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1565514022-2c9e1a3d8b17?auto=format&fit=crop&w=500&q=80"
              alt="Gestion des créances"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h5 className="text-warning fw-bold">
              Des Solutions Efficaces Pour La Gestion de Vos Créances
            </h5>
            <p className="mt-3">
              Optimisez votre trésorerie avec des solutions de recouvrement sur mesure...
              <br />
              Découvrez comment nous transformons la gestion de vos créances en un levier de performance.
            </p>
          </div>
        </div>

        {/* Bloc bas */}
        <div className="row align-items-start">
          <div className="col-md-7">
            <h5 className="text-success fw-bold mb-4">
              Nos services de recouvrement
            </h5>
            <div className="d-flex flex-column gap-3">
              {services.map((s, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-start p-3 border rounded shadow-sm bg-white"
                >
                  <div className="icon-box me-3">
                    <FaSyncAlt size={22} className="text-success" />
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
          <div className="col-md-5 mt-4 mt-md-0 position-relative">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80"
              alt="Team working"
              className="img-fluid rounded mb-3"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80"
              alt="Secondary"
              className="img-fluid rounded secondary-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebtRecovery;
