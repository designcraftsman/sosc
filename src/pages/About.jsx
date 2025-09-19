import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Mission from "../components/Mission";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";
import Team from "../components/Team";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/about.jpg';
import AboutExpertise from "../components/AboutExpertise";
import { useLanguage } from "../context/LanguageContext";


const About = () => {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <Header 
        title={t('pages.about.headerTitle')}
        text={t('pages.about.headerText')}
        backgroundImage={ctaBg}
        height="500px"
      />
      <div className="container">
        <Mission />
        <WhyChooseUs />
        <AboutExpertise />
        <Team />
      </div>
      <CallToAction />
      <Footer />
    </>
  );
};

export default About;
