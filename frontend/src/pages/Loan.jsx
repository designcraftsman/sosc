import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/credit.jpg';
import LoanPartner  from "../components/LoanPartner";
import FinancialPartner from "../components/FinancialPartner";
import LoanPacks from "../components/LoanPacks";
import WhyChooseLoan from "../components/WhyChooseLoan";
import { useLanguage } from "../context/LanguageContext";

const Loan = () => {
  const { t } = useLanguage();
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title={t('pages.loan.headerTitle')}
        backgroundImage={ctaBg}
        height="500px"
      />
      {/* Ajoutez ici d'autres sections spécifiques aux services si nécessaire */}
        <LoanPartner />
        <FinancialPartner />
        <WhyChooseLoan />
        <LoanPacks />

      <Footer />
    </React.Fragment>
  );
};

export default Loan;


