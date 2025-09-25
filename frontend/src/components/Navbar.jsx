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
import { useLanguage } from "../context/LanguageContext";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();
  const dropdownTextAlign = dir === 'rtl' ? 'text-end' : 'text-start';

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

  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  return (
    <>
      <nav 
        className={`navbar navbar-expand-lg fixed-top sosc-navbar ${isScrolled ? 'scrolled' : ''}`}
        dir={dir}
      >
      <div className="container-fluid d-flex mx-md-5 justify-content-between align-items-center">
        {/* Mobile: Menu button on left */}
        <div className="d-lg-none">
          <button 
            onClick={toggleMobileModal}
            className="menu-toggle-btn btn btn-outline-secondary"
            style={{ 
              transition: 'all 0.2s ease',
              transform: isMobileModalOpen ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            <HiOutlineMenuAlt1 className="fs-2 text-dark" />
          </button>
        </div>
        
        {/* Logo - center on mobile, left on desktop */}
        <div className="d-lg-block">
          <Link 
            className="navbar-brand fw-bold" 
            to="/" 
          >
            <img src={logo} className="logo" alt="Logo"/>
          </Link>
        </div>

        {/* Center nav - desktop only */}
        <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <NavLink 
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
                to="/"
                style={{ color: '#000' }}
              >
                {t('nav.home')}
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                to="/about"
                style={{ color: '#000' }}
              >
                {t('nav.about')}
              </NavLink>
            </li>
            <li 
              className="nav-item dropdown mx-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`nav-link dropdown-toggle btn btn-link ${servicesOpen ? 'active' : ''}`}
                style={{ 
                  color: '#000',
                  textDecoration: 'none',
                  border: 'none',
                  background: 'transparent',
                  padding: '0.5rem 1rem'
                }}
                aria-expanded={servicesOpen}
              >
                {t('nav.services')}
                <RiArrowDropDownLine
                  className="fs-4 mb-1"
                  style={{ transition: 'transform .2s ease', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              <div 
                className={`dropdown-menu ${servicesOpen ? ' show' : ''} ${dropdownTextAlign}`}
                style={{ position: 'absolute' }}
              >
                <NavLink className={({ isActive }) => `dropdown-item mb-2 ${isActive ? 'active' : ''}`} to="/services/crédit" onClick={() => setServicesOpen(false)}>
                  {t('nav.credit')}
                </NavLink>
                <NavLink className={({ isActive }) => `dropdown-item mb-2 ${isActive ? 'active' : ''}`} to="/services/recouvrement" onClick={() => setServicesOpen(false)}>
                  {t('nav.recovery')}
                </NavLink>
                <NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`} to="/services/formations" onClick={() => setServicesOpen(false)}>
                  {t('nav.courses')}
                </NavLink>
              </div>
            </li>
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/contact"
              >
                {t('nav.contact')}
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/faq"
              >
                {t('nav.faq')}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right controls */}
        <div className="d-flex align-items-center fs-6">
          {/* Language dropdown - show on mobile and desktop */}
          <div 
            className="dropdown me-md-3"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              type="button"
              className="btn btn-outline-dark fw-medium rounded-pill px-3 mx-md-2 dropdown-toggle"
              aria-expanded={langOpen}
              onClick={() => setLangOpen(prev => !prev)}
            >
              {language === 'ar' ? 'Ar' : 'Fr'}
              <RiArrowDropDownLine
                className={`fs-4 ${dir === 'rtl' ? 'me-1' : 'ms-1'}`}
                style={{ transition: 'transform .2s ease', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <div className={`dropdown-menu dropdown-menu-end ${langOpen ? ' show' : ''} ${dropdownTextAlign}`}>
              <button className="dropdown-item" onClick={() => { setLanguage('fr'); setLangOpen(false); }}>Fr</button>
              <button className="dropdown-item" onClick={() => { setLanguage('ar'); setLangOpen(false); }}>Ar</button>
            </div>
          </div>
          {/* Discuss button - desktop only */}
          <a href="/contact" className="btn btn-dark fw-bold text-white fs-6 rounded-pill py-2 px-3 mx-2 d-none d-lg-inline-flex">
            {t('nav.discuss')}
            <FiArrowUpRight className="ms-2 fs-3" />
          </a>
          {/* Desktop menu button */}
          <div className="mx-3 d-none d-lg-block">
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

    {/* Background Blur Overlay - Large screens only */}
    {isModalOpen && (
      <div 
        className="modal-overlay d-none d-lg-block"
        onClick={closeModal}
      />
    )}

    {/* Side Modal - Large screens only - Original Content */}
    <div 
      className={`side-modal d-none d-lg-block ${isModalOpen ? 'open' : ''}`}
      dir={dir}
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
        <p className="fs-6 opacity-75 fw-light">{t('navbar.modal.description')}</p>
      </div>
      <hr />
      {/* Contact Information */}
      <div className="mt-5">
        <h6 className="fw-semibold fs-5 mb-4">{t('navbar.modal.contactHeading')}</h6>
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
      {/* Social Media */}
      <div className="mt-5">
        <h6 className="fw-semibold fs-5 mb-4">{t('navbar.modal.followHeading')}</h6>
         <div className="d-flex gap-4">
                      <div ><a href="#" className=" fs-3 border rounded-circle p-2 pt-1"><RiFacebookLine /></a></div>
                      <div ><a href="#" className=" fs-3 border rounded-circle p-2 pt-1"><CiInstagram /></a></div>
                      <div ><a href="#" className=" fs-3 border rounded-circle p-2 pt-1"><RiLinkedinLine /></a></div>
          </div>
      </div>
    </div>

    {/* Bootstrap Modal - Small screens only */}
    <div className={`modal d-lg-none ${isMobileModalOpen ? 'show' : ''}`} 
         id="mobileNavModal" 
         tabIndex="-1" 
         style={{ 
           display: 'block',
           opacity: isMobileModalOpen ? 1 : 0,
           visibility: isMobileModalOpen ? 'visible' : 'hidden',
           transition: 'opacity 0.3s ease, visibility 0.3s ease'
         }}
         dir={dir}>
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content" 
             style={{
               transform: isMobileModalOpen ? 'translateX(0)' : 'translateX(-100%)',
               transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
               willChange: 'transform'
             }}>
          <div className="modal-header">
            <img src={logo} alt="Logo" className="modal-logo" style={{ height: '40px' }} />
            <button 
              type="button" 
              className="btn-close" 
              onClick={closeMobileModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className={`${dropdownTextAlign} d-flex flex-column h-100 justify-content-between`}>
              <ul className="list-unstyled text-center">
                <li className="mb-3" 
                    style={{
                      transform: isMobileModalOpen ? 'translateX(0)' : 'translateX(-30px)',
                      opacity: isMobileModalOpen ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
                    }}>
                  <NavLink to="/" className="text-decoration-none fs-5" onClick={closeMobileModal}>{t('nav.home')}</NavLink>
                </li>
                <hr />
                <li className="mb-3"
                    style={{
                      transform: isMobileModalOpen ? 'translateX(0)' : 'translateX(-30px)',
                      opacity: isMobileModalOpen ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s'
                    }}>
                  <NavLink to="/about" className="text-decoration-none fs-5" onClick={closeMobileModal}>{t('nav.about')}</NavLink>
                </li>
                <hr />
                <li className="mb-3"
                    style={{
                      transform: isMobileModalOpen ? 'translateX(0)' : 'translateX(-30px)',
                      opacity: isMobileModalOpen ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
                    }}>
                  <button 
                    onClick={() => setMobileServicesOpen(prev => !prev)}
                    className="btn btn-link text-decoration-none fs-5 p-0"
                    style={{ 
                      color: 'inherit',
                      border: 'none',
                      background: 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {t('nav.services')}
                    <RiArrowDropDownLine
                      className="fs-4 ms-1"
                      style={{ 
                        transition: 'transform .2s ease', 
                        transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                      }}
                    />
                  </button>
                  <div 
                    className={`mt-2`}
                    style={{ 
                      transition: 'all 0.4s ease-in-out',
                      maxHeight: mobileServicesOpen ? '300px' : '0',
                      opacity: mobileServicesOpen ? 1 : 0,
                      overflow: 'hidden',
                      transform: mobileServicesOpen ? 'translateY(0)' : 'translateY(-10px)'
                    }}
                  >
                    <ul className="list-unstyled mt-2 ms-3">
                      <li className="mb-2"><NavLink to="/services/crédit" className="text-decoration-none" onClick={closeMobileModal}>{t('nav.credit')}</NavLink></li>
                      <hr />
                      <li className="mb-2"><NavLink to="/services/recouvrement" className="text-decoration-none" onClick={closeMobileModal}>{t('nav.recovery')}</NavLink></li>
                      <hr />
                      <li className="mb-2"><NavLink to="/services/formations" className="text-decoration-none" onClick={closeMobileModal}>{t('nav.courses')}</NavLink></li>
                    </ul>
                  </div>
                </li>
                <hr />
                <li className="mb-3"
                    style={{
                      transform: isMobileModalOpen ? 'translateX(0)' : 'translateX(-30px)',
                      opacity: isMobileModalOpen ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s'
                    }}>
                  <NavLink to="/faq" className="text-decoration-none fs-5" onClick={closeMobileModal}>{t('nav.faq')}</NavLink>
                </li>
                <hr />
                <li className="mb-3"
                    style={{
                      transform: isMobileModalOpen ? 'translateX(0)' : 'translateX(-30px)',
                      opacity: isMobileModalOpen ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s'
                    }}>
                  <NavLink to="/contact" className="text-decoration-none fs-5" onClick={closeMobileModal}>{t('nav.contact')}</NavLink>
                </li>
              </ul>

            

              {/* Social Media Links */}
              <div className="mt-auto text-center"
                   style={{
                     transform: isMobileModalOpen ? 'translateY(0)' : 'translateY(30px)',
                     opacity: isMobileModalOpen ? 1 : 0,
                     transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s'
                   }}>
                <h6 className="fw-semibold fs-6 mb-3">{t('navbar.modal.followHeading')}</h6>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="fs-3 border rounded-circle p-2 pt-1 text-decoration-none"
                     style={{ 
                       transition: 'transform 0.2s ease',
                       ':hover': { transform: 'scale(1.1)' }
                     }}>
                    <RiFacebookLine />
                  </a>
                  <a href="#" className="fs-3 border rounded-circle p-2 pt-1 text-decoration-none"
                     style={{ 
                       transition: 'transform 0.2s ease',
                       ':hover': { transform: 'scale(1.1)' }
                     }}>
                    <CiInstagram />
                  </a>
                  <a href="#" className="fs-3 border rounded-circle p-2 pt-1 text-decoration-none"
                     style={{ 
                       transition: 'transform 0.2s ease',
                       ':hover': { transform: 'scale(1.1)' }
                     }}>
                    <RiLinkedinLine />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Bootstrap Modal Backdrop - Small screens only */}
    <div 
      className="modal-backdrop d-lg-none"
      style={{
        display: 'block',
        opacity: isMobileModalOpen ? 0.5 : 0,
        visibility: isMobileModalOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease'
      }}
      onClick={closeMobileModal}
    ></div>
    </>
  );
};

export default Navbar;
