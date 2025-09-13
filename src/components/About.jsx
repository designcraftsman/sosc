import React from "react";


const About = () => {
  return (
    <section className="py-5 about-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Images */}
          <div className="col-md-6 position-relative">
            <div className="about-images">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Main"
                className="img-fluid main-img rounded"
              />
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Secondary"
                className="img-fluid secondary-img rounded shadow"
              />
            </div>
          </div>

          {/* Text */}
          <div className="col-md-6">
            <h3 className="text-primary fs-4 mb-4">À propos de nous</h3>
            <h5 className="fw-semibold fs-3 mb-3">
              Nous sommes la meilleure agence pour améliorer vos transactions.
            </h5>
            <p className="text-muted">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer.
            </p>
            <a
              href="#"
              className="btn btn-secondary text-white fw-bold rounded-pill px-4"
            >
              En Savoir Plus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
