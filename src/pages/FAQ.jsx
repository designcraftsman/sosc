import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQ";
import faqBg from '../assets/images/faq/faq.jpg';
import CallToAction from "../components/CallToAction";
import { useLanguage } from "../context/LanguageContext";


const FAQ = () => {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <Header 
        title={t('pages.faq.headerTitle')}
        text={t('pages.faq.headerText')}
        backgroundImage={faqBg}
        height="500px"
      />
      <div className="container">
        <FAQSection />
      </div>
      <CallToAction />
      <Footer />
    </>
  );
};

export default FAQ
