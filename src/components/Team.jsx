import React from "react";
import ahmed from "../assets/images/team/ahmed.jpg";
import said from "../assets/images/team/said.jpg";
import bengon from "../assets/images/team/bengon.jpg";
import { useLanguage } from "../context/LanguageContext";

const Team = () => {
  const { t, dir } = useLanguage();
  const names = t('teamSection.names');
  const alignClass = dir === 'rtl' ? 'text-end' : 'text-start';
  const team = [
    {
      name: names?.[0] || "Beaujean Philippe",
      role: t('teamSection.roles')[0],
      img: bengon,
    },
    {
      name: names?.[1] || "Ahmed Bouknani",
      role: t('teamSection.roles')[1],
      img: ahmed,
    },
    {
      name: names?.[2] || "El Amrani Said",
      role: t('teamSection.roles')[2],
      img: said,
    },
  ];

  return (
    <section id="team" className="py-5">
      <div className="container text-center">
        {/* Section Titles */}
  <h5 className="text-primary mb-4 fs-4">{t('teamSection.title')}</h5>
  <h2 className="fw-semibold mb-5 fs-3">{t('teamSection.subtitle')}</h2>

        {/* Team Grid */}
        <div className={`row justify-content-evenly ${alignClass}`}>
          {team.map((member, idx) => (
            <div className="col-md-4 col-sm-6 mb-4" key={idx}>
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
                    height: "400px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />

                {/* Overlay text */}
                <div
                  className={`position-absolute bottom-0 w-100 text-white p-3 ${alignClass}`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                  }}
                >
                  <h6 className="fw-bold mb-0">{member.name}</h6>
                  <small className="opacity-75">{member.role}</small>
                  <div className="icon-underline mt-2"></div>
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
