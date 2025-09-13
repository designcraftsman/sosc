import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/contact/contact-section-bg.png';
import LoanPartner  from "../components/LoanPartner";
import FinancialPartner from "../components/FinancialPartner";
import LoanPacks from "../components/LoanPacks";
import WhyChooseLoan from "../components/WhyChooseLoan";

const Loan = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title="Crédit 5/5"
        backgroundImage={ctaBg}
        height="400px"
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


