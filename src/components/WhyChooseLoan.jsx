import React from "react";
import experience from '../assets/icons/experience.svg';
import adaptive from '../assets/icons/adaptive.svg';
import partner from '../assets/icons/partner.svg';
import follow from '../assets/icons/follow.svg';


const WhyChooseLoan = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image encadrée */}
          <div className="col-md-6 position-relative">
            <div className="border border-success p-2 d-inline-block">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80"
                alt="Why choose us"
                className="img-fluid"
              />
            </div>
          </div>
          {/* Texte + icônes */}
          <div className="col-md-6">
            <h5 className="text-primary fs-4 mb-4 fw-semibold">
              Pourquoi choisir SOSC pour votre intermédiation financière ?
            </h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center"><img src={experience} alt="Experience" className="me-2" /><p className="m-0">Expertise reconnue dans le secteur financier marocain</p></li>
              <li className="mb-3 d-flex align-items-center"><img src={adaptive} alt="Adaptive" className="me-2" /><p className="m-0">Accès privilégié à des solutions de financement adaptées et compétitives.</p></li>
              <li className="mb-3 d-flex align-items-center"><img src={partner} alt="Partner" className="me-2" /><p className="m-0">Accompagnement personnalisé pour garantir le succès de vos demandes de financement.</p></li>
              <li className="d-flex align-items-center"><img src={follow} alt="Follow" className="me-2" /><p className="m-0">Réduction des démarches administratives grâce à notre réseau de partenaires.</p></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoan;
