import React from "react";
import whychooseus from '../assets/images/about/why-choose-us.jpg';

const WhyChooseUs = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">  
          <div className="col-5 mx-auto">
            <img src={whychooseus} className="img-fluid" alt="" />
          </div>
          <div className="col-5 mx-auto">
          <h3 className="fw-semibold mb-3 fs-4 text-primary">Pourquoi nous choisir ?</h3>
            <ul className="">
              <li>✔ Une expertise reconnue dans le domaine du Crédit et du Recouvrement</li>
              <li>✔ Une approche sur mesure adaptée à vos besoins</li>
              <li>✔ Un engagement à long terme pour des solutions efficaces et stratégiques</li>
            </ul>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default WhyChooseUs;
