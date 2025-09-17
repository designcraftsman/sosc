import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from '../assets/images/hero/formations.jpg';
import CoursesIntro from "../components/CoursesIntro";
import CoursesList  from "../components/CoursesList";

const Courses = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header 
        title="Nos Formations"
        backgroundImage={ctaBg}
      />
      <CoursesIntro />
      <CoursesList />
      <Footer />
    </React.Fragment>
  );
};


export default Courses;


