import React from "react";
import financialPartnerImg from '../assets/images/crédit/financialPartner.gif';

const FinancialPartners = () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="row align-items-center bg-success">
          <div className="col-md-6 p-5">
            <h5 className="text-primary fs-4 fw-semibold mb-4">Nos partenaires financiers</h5>
            <p className="mt-3 fs-5">
              Grâce à nos partenariats stratégiques avec des institutions financières de renom, nous vous offrons l'accès aux meilleures offres de crédit du marché. Nos partenaires sont sélectionnés avec soin pour leur expertise, leur fiabilité et leur capacité à répondre à vos besoins financiers
            </p>
          </div>
          <div className="col-md-6 m-0 p-0">
            <img src={financialPartnerImg} alt="Partenaires financiers" className="w-100" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialPartners;
