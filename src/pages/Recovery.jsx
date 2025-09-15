import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/contact/contact-section-bg.png';
import RecoveryPartner from "../components/RecoveryPartner";
import DebtRecovery  from "../components/DebtRecovery";


const Loan = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title="Recouvrement +"
        backgroundImage={ctaBg}
        height="400px"
      />

        <RecoveryPartner />
        <DebtRecovery />
      <Footer />
    </React.Fragment>
  );
};

export default Loan;


