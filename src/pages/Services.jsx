import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/services.jpg';
import ServicesSection from "../components/Services";
import Cta from '../components/CallToAction';

const Services = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title="Nos Services"
        text="Découvrez nos services et comment nous pouvons vous aider à atteindre vos objectifs"
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


