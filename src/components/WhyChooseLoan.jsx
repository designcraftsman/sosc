import React from "react";

const WhyChooseLoan = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image encadrée */}
          <div className="col-md-6 position-relative">
            <div className="border border-success p-2 d-inline-block">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80"
                alt="Why choose us"
                className="img-fluid"
              />
            </div>
          </div>
          {/* Texte + icônes */}
          <div className="col-md-6">
            <h5 className="text-primary fs-4 mb-4 fw-semibold">
              Pourquoi choisir SOSC pour votre intermédiation financière ?
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">✔ Expertise reconnue dans le secteur financier marocain</li>
              <li className="mb-2">✔ Expertise reconnue dans le secteur financier marocain</li>
              <li className="mb-2">✔ Expertise reconnue dans le secteur financier marocain</li>
              <li>✔ Expertise reconnue dans le secteur financier marocain</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoan;
