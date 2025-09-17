import React from "react";
import loanPartnerImg from '../assets/images/crédit/loanPartner.jpg';

const RecoveryPartner = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-3 mx-auto">
            <img
              src={loanPartnerImg}
              alt="Partner"
              className="img-fluid "
            />
          </div>
          {/* Texte */}
          <div className="col-md-5 mx-auto">
            <h4 className="text-primary fw-semibold">
              Des Solutions Efficaces Pour La Gestion de Vos Créances
            </h4>
            <p className="mt-3">
              Optimisez votre trésorerie avec des solutions de recouvrement sur mesure

En conformité avec le Code étique du recouvrement pré-judicaire des créances de BANK AL-MAGHRIB, nos services de recouvrement externalisé couvrent l’ensemble des étapes essentielles pour garantir un suivi efficace et une récupération rapide de vos créances. Nous mettons en œuvre des méthodes éprouvées qui assurent un taux de recouvrement élevé tout en préservant vos relations commerciales.

Découvrez comment nous transformons la gestion de vos créances en un levier de performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryPartner;
