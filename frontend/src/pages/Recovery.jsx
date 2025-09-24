import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/hero/recouvrement.jpg';
import RecoveryPartner from "../components/RecoveryPartner";
import RecoveryEngagement  from "../components/RecoveryEngagement";
import DebtRecovery  from "../components/DebtRecovery";
import { useLanguage } from "../context/LanguageContext";


const Loan = () => {
  const { t } = useLanguage();
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title={t('pages.recovery.headerTitle')}
        backgroundImage={ctaBg}
        height="500px"
      />

        <RecoveryPartner />
        <DebtRecovery />
        <RecoveryEngagement />
      <Footer />
    </React.Fragment>
  );
};

export default Loan;


