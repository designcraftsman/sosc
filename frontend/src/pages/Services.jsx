import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/services.jpg';
import ServicesSection from "../components/Services";
import Cta from '../components/CallToAction';
import { useLanguage } from "../context/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title={t('pages.services.headerTitle')}
        text={t('pages.services.headerText')}
        backgroundImage={ctaBg}
        height="500px"
      />
      {/* Ajoutez ici d'autres sections spécifiques aux services si nécessaire */}
      <ServicesSection />
      <Cta />
      <Footer />
    </React.Fragment>
  );
};

export default Services;


