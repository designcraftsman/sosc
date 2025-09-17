import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import Map from "../components/Map";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/bg/contact.jpg';

const Contact = () => {
  return (
    <>
      <Navbar />
      <Header 
        title="Vous avez des questions ?"
        text="Have a question or need to discuss your next project? Reach out to our team via the contact form below"
        backgroundImage={ctaBg}
        height="500px"
      />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Contact;
