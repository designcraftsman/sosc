import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.gif';
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav 
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: isScrolled 
          ? '#BCB600' // Full opacity primary color
          : 'rgba(188, 182, 0, 0.7)', // 50% opacity primary color
        transition: 'background-color 0.3s ease'
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
        <div style={{ color: '#000' }}>
          <span className="me-4">
            <span className="fs-4"><CiLocationOn /></span> Mohammedia, Maroc
          </span>
          <span>
            <span className="fs-4"><CiPhone /></span> +212-652976002
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
