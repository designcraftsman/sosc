import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/hero/formations.jpg';
import CoursesIntro from "../components/CoursesIntro";
import CoursesList  from "../components/CoursesList";
import { useLanguage } from "../context/LanguageContext";

const Courses = () => {
  const { t } = useLanguage();
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title={t('pages.courses.headerTitle')}
        backgroundImage={ctaBg}
      />
      <CoursesIntro />
      <CoursesList />
      <Footer />
    </React.Fragment>
  );
};


export default Courses;


