import React, { useMemo } from "react";
import TrainingCard from "./CourseCard";
import course1 from '../assets/images/formations/1.jpg';
import course2 from '../assets/images/formations/2.jpg';
import { useLanguage } from "../context/LanguageContext";

const CoursesList = () => {
  const { t } = useLanguage();
  const list = t('coursesList.items');
  const trainings = useMemo(() => ([
    {
      id: list[0].id,
      image: course1,
      title: list[0].title,
      description: list[0].description,
      level: list[0].level,
      hours: `${list[0].hours} ${t('common.hours')}`,
      link: "/services/formations/base-recouvrement",
    },
    {
      id: list[1].id,
      image: course2,
      title: list[1].title,
      description: list[1].description,
      level: list[1].level,
      hours: `${list[1].hours} ${t('common.hours')}`,
      link: "/services/formations/techniques-avancees",
    },
  ]), [list, t]);

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
