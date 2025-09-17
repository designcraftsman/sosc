import React from "react";
import crédit0 from '../assets/images/crédit/credit0.jpg';
import jeune from '../assets/images/crédit/jeune.jpg';
import success from '../assets/images/crédit/success.jpg';
import retired from '../assets/images/crédit/retired.jpg';
import employee from '../assets/images/crédit/employee.jpg';


const LoanPacks = () => {
  const packs = [
    { title: "El Hana", text: "Conçu pour les Fonctionnaires, ce pack vous aide à réaliser vos projets personnels.", image: employee },
    { title: "El Baraka", text: "Destiné aux entrepreneurs, ce pack soutient vos ambitions commerciales.", image: success },
    { title: "El Nour", text: "Pour les jeunes diplômés, ce pack facilite votre insertion professionnelle.", image: jeune },
    { title: "El Khair", text: "Adapté aux retraités, ce pack sécurise votre avenir financier.", image: retired },
    { title: "El Amal", text: "Conçu pour les familles, ce pack réalise vos rêves immobiliers.", image: crédit0 },
    { title: "El Najah", text: "Pour les étudiants, ce pack finance votre éducation et formation.", image: success },
  ];

  // Duplicate the packs array for seamless infinite scroll
  const duplicatedPacks = [...packs, ...packs];

  return (
    <section className="py-5 text-center">
      <div className="container-fluid">
        <div className="icon-underline mx-auto mb-3"></div>
        <h5 className="text-primary fs-4 fw-bold mb-5">Découvrez Nos Packs</h5>
        
        <div 
          className="carousel-container"
          style={{
            overflow: 'hidden',
            position: 'relative',
            width: '100%'
          }}
        >
          <div 
            className="cards-wrapper infinite-scroll"
            style={{
              display: 'flex',
              width: `${duplicatedPacks.length * 300}px`, // Fixed width per card
              animation: 'infiniteScroll 20s linear infinite'
            }}
          >
            {duplicatedPacks.map((pack, idx) => (
              <div 
                className="card-slide" 
                key={idx}
                style={{
                  flex: '0 0 300px',
                  margin: '0 15px'
                }}
              >
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h6 className="fw-bold text-primary">{pack.title}</h6>
                    <p className="small text-muted">{pack.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${packs.length * 330}px);
          }
        }

        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LoanPacks;
