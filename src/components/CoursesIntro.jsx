import React from "react";
import courseImage from '../assets/images/formations/formationIntro.jpg';

const CoursesIntro = () => {
  return (
    <section className="training-intro py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 mx-auto">
            <h2 className="text-primary fw-semibold fs-4 mb-4">
              Développez l’expertise qui fait la différence en recouvrement !
            </h2>
            <p>
              Nos formations spécialisées en recouvrement ont été conçues pour
              répondre aux besoins spécifiques des entreprises, des
              professionnels et du marché de l’emploi. Nos programmes vous
              offrent des compétences opérationnelles et stratégiques
              indispensables.
            </p>
            <p>
              Grâce à des modules pratiques et à l’expertise de nos formateurs
              reconnus dans le domaine, vous apprendrez à gérer efficacement
              toutes les étapes du recouvrement, à établir des stratégies
              adaptées et à utiliser des outils performants de suivi et de
              reporting.
            </p>
            <p>
              Avec SOSC, formez-vous pour anticiper les défis du recouvrement et
              améliorer vos résultats !
            </p>
          </div>
          <div className="col-md-5 mx-auto">
            <img
              src={courseImage}
              alt="Formation en recouvrement"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesIntro;
