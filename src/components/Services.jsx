import React from "react";
import credit from '../assets/icons/credit.svg';
import learn from '../assets/icons/learn.svg';
import recover from '../assets/icons/recover.svg';

const Services = () => {
  const services = [
    { 
      title: "Crédit 5/5", 
      text: "Des solutions de financement sur mesure pour particuliers et entreprises", 
      img: credit 
    },
    { 
      title: "Recouvrement +", 
      text: "Des solutions de financement sur mesure pour particuliers et entreprises", 
      img: recover
    },
    { 
      title: "Formations", 
      text: "Des solutions de financement sur mesure pour particuliers et entreprises", 
      img: learn
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div className="col-3">
            <h2 className="text-primary fs-4 mb-4">Nos Services</h2>
            <h3 className="fs-3 fw-semibold">Quels services proposons-nous à nos clients ?</h3>
          </div>
          <div className="row justify-content-evenly col-9">
          {services.map((s, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
              <div className="h-100 p-3 border border-1 service-card">
                <img
                  src={s.img}
                  alt={s.title}
                  className="mb-2  d-block"
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
                
                {/* Barre verte sous l’icône */}
                <div className="icon-underline  mb-3"></div>

                <h5 className="fw-bold fs-5">{s.title}</h5>
                <p className="fs-6 fw-light">{s.text}</p>
                <a href="/services/crédit" className="text-decoration-underline">En savoir plus</a>
              </div>
            </div>

          ))}
        </div>
        </div>
        
      </div>
    </section>
  );
};

export default Services;
