import React from "react";
import Navbar from "../components/Navbar";
import HeroAbout from "../components/HeroAbout";
import Mission from "../components/Mission";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";
import Team from "../components/Team";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <HeroAbout />
      <Mission />
      <WhyChooseUs />
      <CallToAction />
      <Team />
      <Footer />
    </>
  );
};

export default About;
