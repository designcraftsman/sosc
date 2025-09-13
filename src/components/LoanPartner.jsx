import React from "react";
import loanPartnerImg from '../assets/images/crédit/loanPartner.jpg';

const LoanPartner = () => {
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
              Votre partenaire de confiance pour accéder aux meilleures offres de crédit au Maroc.
            </h4>
            <p className="mt-3">
              Chez SOSC, nous sommes votre partenaire stratégique dans la recherche et l’obtention de financements adaptés. Grâce à nos partenariats solides avec les institutions financières de premier plan, nous vous proposons des solutions de crédit exclusives, sur mesure et compétitives, que vous soyez un particulier ou une entreprise. Nous gérons chaque étape du processus de financement, de l’étude de vos besoins à l’obtention du financement, pour vous assurer les meilleures conditions possibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanPartner;
