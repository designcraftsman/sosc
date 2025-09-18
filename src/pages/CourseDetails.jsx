import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from '../assets/images/contact/contact-section-bg.png';
import { FaClock, FaUserGraduate } from "react-icons/fa";
import CallToAction from "../components/CallToAction";
import { FaLightbulb } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const CourseDetails = () => {
  const { t } = useLanguage();
  const learnPoints = t('courseDetails.learnPoints');
  const audience = t('courseDetails.audience');
  const contenu = t('courseDetails.content');

  const { id } = useParams();
  const titleMap = t('courseDetails.titleMap');
  const pageTitle = titleMap[id] || '';
  const coursesList = t('coursesList.items');
  const courseInfo = Array.isArray(coursesList)
    ? (coursesList.find((c) => c.id === id) || coursesList[0])
    : null;

  return (
    <React.Fragment>
      <Navbar />
      {/* Page-specific hero with custom styling (no shared Header props) */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="container">
          <div className=" py-4 col-4 ">
            <div className="icon-underline mb-4"></div>
            <h1 className="fw-bold m-0">{pageTitle}</h1>
            <div className="d-flex align-items-center justify-content-start fw-light text-white-75 mt-3">
              <p className=" "><FaUserGraduate /> {courseInfo?.level || t('courseDetails.levelBeginner')}</p>
              <p className="mx-5"><FaClock /> {courseInfo?.hours || '40'} {t('courseDetails.hoursUnit')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
        {/* Description */}
        <h5 className="fw-semibold fs-4 mb-4 text-primary">{t('courseDetails.labels.description')}</h5>
        <p>{courseInfo?.description}</p>

        {/* Boxes */}
        <div className="row my-5">
          <div className="col-md-6 mb-3">
            <div className="p-4 bg-light rounded shadow-sm h-100 text-start">
              <h6 className="fw-semibold fs-4 text-primary">{t('courseDetails.labels.audience')}</h6>
              <ul className="mt-4">
                {audience.map((item, idx) => (
                  <li key={idx} className="mb-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="p-4 bg-light rounded shadow-sm h-100 text-start">
              <h6 className="fw-semibold fs-4 text-primary">{t('courseDetails.labels.learn')}</h6>
              <ul className="mt-4 list-unstyled">
                {learnPoints.map((point, idx) => (
                  <li className="d-flex align-items-start mb-3" key={idx}>
                    <FaLightbulb className="text-secondary me-2 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contenu de la formation */}
  <h5 className="fw-semibold fs-4 text-primary mt-5">{t('courseDetails.labels.content')}</h5>
        <ul className="list-unstyled mt-4">
          {contenu.map((item, idx) => (
            <li className="d-flex align-items-start mb-3" key={idx}>
              <div
                className="d-flex justify-content-center align-items-center me-3"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#34A84A",
                  color: "#fff",
                  fontWeight: "medium",
                }}
              >
                {idx + 1}
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        </div>
      </section>
      <CallToAction />
      <Footer />
    </React.Fragment>
  );
};

export default CourseDetails;
