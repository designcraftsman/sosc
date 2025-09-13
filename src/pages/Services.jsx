import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h2>Nos services</h2>
          <p>
            Découvrez notre offre de services conçus <br />
            pour simplifier votre quotidien.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="services-list">
        <ServiceCard
          icon="https://via.placeholder.com/100"
          title="Crédit 5/5"
          description="Des solutions de financement sur mesure pour particuliers et entreprises"
          link="#"
        />
        <ServiceCard
          icon="https://via.placeholder.com/100"
          title="Recouvrement +"
          description="Des solutions de financement sur mesure pour particuliers et entreprises"
          link="#"
        />
        <ServiceCard
          icon="https://via.placeholder.com/100"
          title="Formations"
          description="Des solutions de financement sur mesure pour particuliers et entreprises"
          link="#"
        />
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="cta-content">
          <h2>
            Discutons de la manière dont nous pouvons contribuer à améliorer
            votre entreprise.
          </h2>
          <button>Prenez rendez-vous</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
