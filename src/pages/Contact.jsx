import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import Map from "../components/Map";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/contact.jpg';
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <Header 
        title={t('pages.contact.headerTitle')}
        text={t('pages.contact.headerText')}
        backgroundImage={ctaBg}
        height="500px"
      />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Contact;
