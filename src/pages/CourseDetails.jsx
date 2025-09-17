import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from '../assets/images/contact/contact-section-bg.png';
import { FaClock, FaUserGraduate } from "react-icons/fa";
import CallToAction from "../components/CallToAction";
import { FaLightbulb } from "react-icons/fa";

const CourseDetails = () => {
  const learnPoints = [
    "Comprendre les fondamentaux du recouvrement amiable et ses étapes clés.",
    "Maîtriser les techniques de relance (automatique, manuelle, mise en demeure).",
    "Développer une communication claire et efficace avec les débiteurs.",
  ];

  const audience = [
    "Novices souhaitant acquérir des compétences en recouvrement",
    "Étudiants : Bac+2 en droit, économie, gestion, ou lauréats de l’OFPPT.",
    "Entreprises débutant la gestion du recouvrement en interne.",
  ];

  const contenu = [
    "Introduction au recouvrement : objectifs et étapes clés.",
    "Les bonnes pratiques de relance amiable. – Comment communiquer efficacement avec les débiteurs.",
    "Escalade de communication.",
    "Relance Automatique, Manuelle et mise en demeure.",
    "La gestion des objections et des conflits.",
    "La gestion préventive du stress.",
    "Introduction à l’utilisation des outils de suivi.",
  ];

  const { id } = useParams();
  const titleMap = {
    "base-recouvrement": "Formation de base en recouvrement",
    "techniques-avancees": "Techniques avancées de recouvrement",
  };
  const pageTitle = titleMap[id] || "Détails de la formation";

  return (
    <React.Fragment>
      <Navbar />
      {/* Page-specific hero with custom styling (no shared Header props) */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="container">
          <div className=" py-4 col-4 ">
            <div className="icon-underline mb-4"></div>
            <h1 className="fw-bold m-0">{pageTitle}</h1>
            <div className="d-flex align-items-center justify-content-start fw-light text-white-75 mt-3">
              <p className=" "><FaUserGraduate /> Débutant</p>
              <p className="mx-5"><FaClock /> 40 heures</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
        {/* Description */}
        <h5 className="fw-semibold fs-4 mb-4 text-primary">Description</h5>
        <p>
          Apprendre les bases du recouvrement amiable, de la gestion des
          créances et de la relation client.
        </p>

        {/* Boxes */}
        <div className="row my-5">
          <div className="col-md-6 mb-3">
            <div className="p-4 bg-light rounded shadow-sm h-100 text-start">
              <h6 className="fw-semibold fs-4 text-primary">Ce cours est destiné aux</h6>
              <ul className="mt-4">
                {audience.map((item, idx) => (
                  <li key={idx} className="mb-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="p-4 bg-light rounded shadow-sm h-100 text-start">
              <h6 className="fw-semibold fs-4 text-primary">Ce que vous allez apprendre</h6>
              <ul className="mt-4 list-unstyled">
                {learnPoints.map((point, idx) => (
                  <li className="d-flex align-items-start mb-3" key={idx}>
                    <FaLightbulb className="text-secondary me-2 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contenu de la formation */}
        <h5 className="fw-semibold fs-4 text-primary mt-5">Contenu de la formation</h5>
        <ul className="list-unstyled mt-4">
          {contenu.map((item, idx) => (
            <li className="d-flex align-items-start mb-3" key={idx}>
              <div
                className="d-flex justify-content-center align-items-center me-3"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#34A84A",
                  color: "#fff",
                  fontWeight: "medium",
                }}
              >
                {idx + 1}
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        </div>
      </section>
      <CallToAction />
      <Footer />
    </React.Fragment>
  );
};

export default CourseDetails;
