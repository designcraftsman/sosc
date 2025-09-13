import React from "react";
import ahmed from "../assets/images/team/ahmed.jpg";
import said from "../assets/images/team/said.jpg";
import bengon from "../assets/images/team/bengon.jpg";

const Team = () => {
  const team = [
    {
      name: "Beaujean Philippe",
      role: "Coaching en Soft Skills",
      img: bengon,
    },
    {
      name: "Ahmed Bouknani",
      role: "Dr en Droit Privé",
      img: ahmed,
    },
    {
      name: "El Amrani Said",
      role: "Associé et Directeur Commercial Exécutif",
      img: said,
    },
  ];

  return (
    <section className="py-5">
      <div className="container text-center">
        {/* Section Titles */}
        <h5 className="text-primary mb-4 fs-4">Notre équipe</h5>
        <h2 className="fw-semibold mb-5 fs-3">Rencontrez notre équipe talentueuse</h2>

        {/* Team Grid */}
        <div className="row justify-content-evenly">
          {team.map((member, idx) => (
            <div className="col-md-3 col-sm-6 mb-4" key={idx}>
              <div
                className="position-relative overflow-hidden rounded-3 shadow-sm"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Image with hover zoom */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-100 rounded-3"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />

                {/* Overlay text */}
                <div
                  className="position-absolute bottom-0 w-100 text-white p-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                  }}
                >
                  <h6 className="fw-bold mb-0">{member.name}</h6>
                  <small className="opacity-75">{member.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra hover styling via CSS */}
      <style jsx>{`
        .position-relative:hover img {
          transform: scale(1.05);
        }
        .position-relative:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default Team;
