import React from "react";
import TrainingCard from "./CourseCard";

const CoursesList = () => {
  const trainings = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Formation de base en recouvrement",
      description:
        "Apprendre les bases du recouvrement amiable, de la gestion des créances et de la relation client.",
      level: "Débutant",
      hours: "40 heures",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Techniques avancées de recouvrement",
      description:
        "Approfondir les techniques de recouvrement pour maximiser l’efficacité et les résultats.",
      level: "Intermédiaire",
      hours: "40 heures",
      link: "#",
    },
  ];

  return (
    <section className="training-list py-5">
      <div className="container">
        {trainings.map((t, idx) => (
          <TrainingCard key={idx} {...t} />
        ))}
      </div>
    </section>
  );
};

export default CoursesList;
