import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeBody from "../components/HomeBody";
import Services from "../components/Services";
import About from "../components/About";
import Mission from "../components/Mission";
import CallToAction from "../components/CallToAction";
import Team from "../components/Team";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeBody />
      <CallToAction />
      <Team />
      <Footer />
    </>
  );
};

export default Home;
