import React from "react";
import loanPartnerImg from '../assets/images/crédit/loan-intro.jpg';
import { useLanguage } from "../context/LanguageContext";

const LoanPartner = () => {
  const { t } = useLanguage();
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-5 mx-auto">
            <img
              src={loanPartnerImg}
              alt="Partner"
              className="img-fluid "
            />
          </div>
          {/* Texte */}
          <div className="col-md-5 mx-auto">
            <h4 className="text-primary fw-semibold">
              {t('loan.partnerTitle')}
            </h4>
            <p className="mt-3">
              {t('loan.partnerText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanPartner;
