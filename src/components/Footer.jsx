import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { RiFacebookLine } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import logo from '../assets/images/logo.gif';


const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="text-white pt-5 text-md-start text-center bg-dark"> 
      <div className="container pb-5">
        <div className="row justify-content-between align-content-start">
          <div className="col-md-3  mb-5">
            <h5 className="col-8 mb-3 fs-5 fw-semibold">{t('footer.followUs')}</h5>
            <div className="d-flex  gap-4">
              <div ><a href="#" className="text-white fs-3 border rounded-circle p-2 pt-1"><RiFacebookLine /></a></div>
              <div ><a href="#" className="text-white fs-3 border rounded-circle p-2 pt-1"><CiInstagram /></a></div>
              <div ><a href="#" className="text-white fs-3 border rounded-circle p-2 pt-1"><RiLinkedinLine /></a></div>
            </div>
          </div>
          <div className="col-md-3 mb-5">
            <h5 className="fs-semibold fs-5 mb-3">{t('footer.company')}</h5>
            <ul className="list-unstyled m-0 p-0 footer-links">
              <li className="mb-2">
                <Link to="/about" className="text-white opacity-75 fw-light small footer-link">{t('footer.about')}</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-white opacity-75 fw-light small footer-link">{t('footer.services')}</Link>
              </li>
              <li className="mb-2">
                <Link to="/about#team" className="text-white opacity-75 fw-light small footer-link">{t('footer.team')}</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fs-semibold fs-5 mb-3">{t('footer.contact')}</h5>
            <ul className="list-unstyled m-0 p-0">
              <li className="mb-2 text-white opacity-75 fw-light small"> <CiLocationOn /> Mohammedia,Maroc</li>
              <li className="mb-2 text-white opacity-75 fw-light small"> <CiPhone /> +212-652976002</li>
              <li className="mb-2 text-white opacity-75 fw-light small"> <AiOutlineMail /> sosc@gmail.com</li>
            </ul>
          </div>
        </div>
        
      </div>
      <hr />
      <div className="d-flex justify-content-between px-5 py-2 align-items-center flex-wrap   bg-dark">
          <div className="col-md-4">
            <img src={logo} className="logo-footer" alt="Logo" />
          </div>
          <div className="col-md-3  text-white">
            <p className="mb-0 small">© 2024 <span className="text-secondary">SOSC</span>. {t('footer.rights')}</p>
          </div>
          <div className="d-flex flex-wrap gap-5 col-md-5 col-12 footer-links">
            <Link to="/policy" className="text-white opacity-75 small footer-link">{t('footer.privacy')}</Link>
            <Link to="/terms" className="text-white opacity-75 small footer-link">{t('footer.terms')}</Link>
            <Link to="/legal-mentions" className="text-white opacity-75 small footer-link">{t('footer.legalMentions')}</Link>
          </div>
        </div>
      {/* Footer hover animation styles */}
      <style>{`
        .footer-link {
          position: relative;
          transition: color .2s ease, transform .2s ease;
        }
        .footer-link:hover { transform: translateY(-1px); }
        .footer-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          width: 0;
          background: #34A84A; /* match navbar underline */
          transition: width .25s ease;
        }
        .footer-link:hover::after { width: 100%; }
      `}</style>
    </footer>
  );
};

export default Footer;
