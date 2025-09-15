import React from "react";
import credit from "../assets/icons/credit.svg";
import learn from "../assets/icons/learn.svg";
import recover from "../assets/icons/recover.svg";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    { 
      title: "Crédit 5/5", 
      text: "Des solutions de financement sur mesure pour particuliers et entreprises", 
      img: credit, 
      link: "/services/crédit"
    },
    { 
      title: "Recouvrement +", 
      text: "Des solutions de financement sur mesure pour particuliers et entreprises", 
      img: recover, 
      link: "/services/recouvrement"
    },
    { 
      title: "Formations", 
      text: "Des solutions de financement sur mesure pour particuliers et entreprises", 
      img: learn, 
      link: "/services/formations"
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div className="col-3">
            <h2 className="text-primary fs-4 mb-4">Nos Services</h2>
            <h3 className="fs-3 fw-semibold">
              Quels services proposons-nous à nos clients ?
            </h3>
          </div>
          <div className="row justify-content-evenly col-9">
            {services.map((s, idx) => (
              <ServiceCard 
                key={idx} 
                img={s.img} 
                title={s.title} 
                text={s.text} 
                link={s.link} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
