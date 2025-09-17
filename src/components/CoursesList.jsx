import React from "react";
import TrainingCard from "./CourseCard";
import course1 from '../assets/images/formations/1.jpg';
import course2 from '../assets/images/formations/2.jpg';

const CoursesList = () => {
  const trainings = [
    {
      id: "base-recouvrement",
      image: course1,
      title: "Formation de base en recouvrement",
      description:
        "Apprenez les fondamentaux du recouvrement amiable, la gestion des créances et la relation client.",
      level: "Débutant",
      hours: "20 heures",
      link: "/services/formations/base-recouvrement",
    },
    {
      id: "techniques-avancees",
      image: course2,
      title: "Techniques avancées de recouvrement",
      description:
        "Approfondissez les techniques de recouvrement pour maximiser l’efficacité et les résultats.",
      level: "Intermédiaire",
      hours: "30 heures",
      link: "/services/formations/techniques-avancees",
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
