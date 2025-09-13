import React from "react";
import Navbar from "../components/Navbar";
import HeroContact from "../components/HeroContact";
import ContactSection from "../components/ContactSection";
import Map from "../components/Map";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <HeroContact />
      <ContactSection />
      <Map />
      <Footer />
    </>
  );
};

export default Contact;
