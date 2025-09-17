import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/images/logo.gif';
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { RiFacebookLine } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav 
        className={`navbar navbar-expand-lg fixed-top sosc-navbar ${isScrolled ? 'scrolled' : ''}`}
      >
      <div className="container-fluid d-flex mx-5 justify-content-between">
        <div>
          <Link 
            className="navbar-brand fw-bold" 
            to="/" 
          >
            <img src={logo} className="logo" alt="Logo"/>
          </Link>
        </div>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <NavLink 
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
                to="/"
                style={{ color: '#000' }}
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                to="/about"
                style={{ color: '#000' }}
              >
                Qui sommes-nous
              </NavLink>
            </li>
            <li 
              className="nav-item dropdown mx-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <NavLink
                id="servicesDropdown"
                className={({ isActive }) => `nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
                aria-expanded={servicesOpen}
                to="/services"
                onClick={(e) => {
                  // Allow normal navigation to /services when clicked
                  // Also toggle the dropdown for quick access on repeated clicks
                  setServicesOpen(prev => !prev);
                }}
              >
                Nos services <RiArrowDropDownLine className="fs-4 mb-1" />
              </NavLink>
              <div 
                className={`dropdown-menu  ${servicesOpen ? ' show' : ''}`}
                aria-labelledby="servicesDropdown"
              >
                <NavLink className={({ isActive }) => `dropdown-item mb-2 ${isActive ? 'active' : ''}`} to="/services/crédit" onClick={() => setServicesOpen(false)}>
                  Crédit 5/5
                </NavLink>
                <NavLink className={({ isActive }) => `dropdown-item mb-2 ${isActive ? 'active' : ''}`} to="/services/recouvrement" onClick={() => setServicesOpen(false)}>
                  Recouvrement +
                </NavLink>
                <NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`} to="/services/formations" onClick={() => setServicesOpen(false)}>
                  Formations
                </NavLink>
              </div>
            </li>
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/contact"
              >
                Contactez-nous
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center fs-6">
          <a href="/contact" className="btn btn-dark fw-bold text-white fs-6 rounded-pill px-2">
            Discutons
            <FiArrowUpRight className="ms-2 fs-3" />
          </a>
          <div className="ms-5">
            <button 
              onClick={toggleModal}
              className="menu-toggle-btn"
            >
              <HiOutlineMenuAlt1 className="fs-2 text-dark" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Background Blur Overlay */}
    {isModalOpen && (
      <div 
        className="modal-overlay"
        onClick={closeModal}
      />
    )}

    {/* Side Modal */}
    <div 
      className={`side-modal ${isModalOpen ? 'open' : ''}`}
    >
      {/* Modal Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <img src={logo} alt="Logo" className="modal-logo" />
        <button 
          onClick={closeModal}
          className="btn-close-custom"
        >
          <TfiClose />
        </button>
      </div>
          
      <div className="container">
        <p className="fs-6 opacity-75 fw-light">Chez SOSC, nous sommes le partenaire de confiance pour les entreprises et les particuliers dans la gestion de leurs finances et de leurs créances.</p>
      </div>
      <hr />
      {/* Contact Information */}
      <div className="mt-5">
        <h6 className="fw-semibold fs-5 mb-4">Contactez-nous</h6>
        <div className="d-flex align-items-center mb-3">
                      <div className="me-3 fs-2 text-dark opacity-75">
                        <CiLocationOn />
                      </div>
                      <div className="fw-light"><p className="p-0 m-0">Résidence Louma, IMM G1, Etg 1 Apprt 263, BD Palestine, Mohammedia. Maroc</p></div>
                    </div>
                    
        
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3 fs-3 text-dark opacity-75">
                        <AiOutlineMail />
                      </div>
                      <div className="fw-light"><p className="p-0 m-0">sosccarl@gmail.com</p></div>
                    </div>
        
                    
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3 fs-2 text-dark opacity-75">
                        <CiPhone />
                      </div>
                      <div className="fw-light">
                        <p className="p-0 m-0">+212 529 555 101</p>
                        <p className="p-0 m-0">+212 529 555 101</p>
                      </div>
                    </div>
      </div>
          <hr />
      {/* Contact Information */}
      <div className="mt-5">
        <h6 className="fw-semibold fs-5 mb-4">Suivez-nous</h6>
         <div className="d-flex gap-4">
                      <div ><a href="#" className=" fs-3 border rounded-circle p-2 pt-1"><RiFacebookLine /></a></div>
                      <div ><a href="#" className=" fs-3 border rounded-circle p-2 pt-1"><CiInstagram /></a></div>
                      <div ><a href="#" className=" fs-3 border rounded-circle p-2 pt-1"><RiLinkedinLine /></a></div>
          </div>
      </div>

      
    </div>
    </>
  );
};

export default Navbar;
