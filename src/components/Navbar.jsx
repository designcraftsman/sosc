import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: isScrolled 
            ? '#BCB600' // Full opacity primary color
            : 'rgba(188, 182, 0, 0.7)', // 50% opacity primary color
          transition: 'background-color 0.3s ease',
          zIndex: 1050
        }}
      >
      <div className="container-fluid d-flex mx-5 justify-content-between">
        <div>
          <Link 
            className="navbar-brand fw-bold" 
            to="/" 
            style={{ 
              color: '#000',
              textDecoration: 'none'
            }}
          >
            <img src={logo} className="logo" alt="Logo"/>
          </Link>
        </div>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{
            borderColor: '#000'
          }}
        >
          <span 
            className="navbar-toggler-icon"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
            }}
          ></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link 
                className="nav-link fw-bold" 
                to="/"
                style={{ color: '#000' }}
              >
                Accueil
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className="nav-link" 
                to="/about"
                style={{ color: '#000' }}
              >
                Qui sommes-nous
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className="nav-link" 
                to="/services"
                style={{ color: '#000' }}
              >
                Nos services
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className="nav-link" 
                to="/contact"
                style={{ color: '#000' }}
              >
                Contactez-nous
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center fs-6">
          <a href="/contact" className="btn btn-dark fw-medium text-white fs-6 rounded-pill px-2">
            Discutons
            <FiArrowUpRight className="ms-2 fs-3" />
          </a>
          <div className="ms-5">
            <button 
              onClick={toggleModal}
              style={{
                background: 'none',
                border: 'none',
                color: '#000',
                cursor: 'pointer'
              }}
            >
              <HiOutlineMenuAlt1 className="fs-2" />
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 1060,
          transition: 'all 0.3s ease'
        }}
      />
    )}

    {/* Side Modal */}
    <div 
      className={`side-modal ${isModalOpen ? 'open' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        right: isModalOpen ? 0 : '-400px',
        width: '400px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.3)',
        zIndex: 1070,
        transition: 'right 0.3s ease',
        padding: '20px',
        overflow: 'auto'
      }}
    >
      {/* Modal Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <img src={logo} alt="Logo" style={{ height: '80px' }} />
        <button 
          onClick={closeModal}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer'
          }}
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
