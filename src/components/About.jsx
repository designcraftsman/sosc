import React from "react";

const About = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="About us" className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h3 className="text-primary fs-4 mb-4">À propos de nous</h3>
            <h5 className="fw-semibold fs-3">Nous sommes la meilleure agence pour améliorer vos transactions.</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer.</p>
            <a href="#" className="btn text-white fww-bold btn-secondary">En savoir plus</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
