import React from "react";

const Mission = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fs-4 text-primary mb-4">Notre mission</h3>
            <h5 className="fw-semibold fs-3">Nous sommes des cabinets de conseil aux entreprises primés.</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy</p>
          </div>
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Mission" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
