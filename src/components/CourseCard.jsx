import React from "react";
import { FaClock, FaUserGraduate } from "react-icons/fa";
import courseImage from "../assets/images/contact/contact-section-bg.png";

const CourseCard = ({ image, title, description, level, hours, link }) => {
  return (
    <div className="course-card card mb-5 shadow-sm">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-4">
          <img
            src={courseImage}
            alt={title}
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

        {/* Content Section */}
        <div className="col-md-8 d-flex flex-column justify-content-between">
          <div className="card-body">
            <h5 className="card-title fw-bold">{title}</h5>
            <p className="card-text text-muted">{description}</p>
            <a href={link} className="text-decoration-underline text-muted">
              En savoir plus
            </a>
          </div>

          
        </div>
      </div>
      {/* Bottom Bar */}
          <div className="course-footer d-flex justify-content-end align-items-center text-white px-3 py-2 mt-3">
            <span className="d-flex align-items-center me-5">
              <FaUserGraduate className="me-2" /> {level}
            </span>
            <span className="d-flex align-items-center">
              <FaClock className="me-2" /> {hours}
            </span>
          </div>
    </div>
  );
};

export default CourseCard;
