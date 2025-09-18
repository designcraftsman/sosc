import React from "react";
import financialPartnerImg from '../assets/images/crédit/financialPartner.gif';
import { useLanguage } from "../context/LanguageContext";

const FinancialPartners = () => {
  const { t } = useLanguage();
  return (
    <section>
      <div className="container-fluid">
        <div className="row align-items-center bg-success">
          <div className="col-md-6 p-5">
            <h5 className="text-primary fs-4 fw-semibold mb-4">{t('financialPartners.title')}</h5>
            <p className="mt-3 fs-5">{t('financialPartners.text')}</p>
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
