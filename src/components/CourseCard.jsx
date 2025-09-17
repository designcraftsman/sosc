import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaUserGraduate } from "react-icons/fa";
import courseImage from "../assets/images/contact/contact-section-bg.png";

const CourseCard = ({ image, title, description, level, hours, link }) => {
  return (
    <div className="course-card card mb-5 border-0 shadow-sm">
      <div className="row g-0 align-items-center">
        {/* Image Section */}
        <div className="col-md-4">
          <img
            src={image || courseImage}
            alt={title}
            className="course-card-img"
          />
        </div>

        {/* Content Section */}
        <div className="col-md-5 d-flex flex-column justify-content-between">
          <div className="card-body">
            <h5 className="card-title fw-bold">{title}</h5>
            <p className="card-text text-muted">{description}</p>
            <Link to={link} className="text-decoration-underline text-muted">
              En savoir plus
            </Link>
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
