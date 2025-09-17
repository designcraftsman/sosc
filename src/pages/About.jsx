import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Mission from "../components/Mission";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";
import Team from "../components/Team";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/about.jpg';


const About = () => {
  return (
    <>
      <Navbar />
      <Header 
        title="À Propos de Nous"
        text="Chez SOSC, nous sommes le partenaire de confiance pour les entreprises et les particuliers dans la gestion de leurs finances et de leurs créances."
        backgroundImage={ctaBg}
        height="500px"
      />
      <Mission />
      <WhyChooseUs />
      <CallToAction />
      <Team />
      <Footer />
    </>
  );
};

export default About;
