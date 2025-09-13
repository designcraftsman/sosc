import React from "react";
import { RiFacebookLine } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import logo from '../assets/images/logo.gif';


const Footer = () => {
  return (
    <footer className="text-white pt-5  bg-dark"> 
      <div className="container pb-5">
        <div className="row justify-content-between align-content-start">
          <div className="col-md-3">
            <h5 className="col-8 mb-3 fs-5 fw-semibold">Retrouvez-nous sur les réseaux sociaux</h5>
            <div className="d-flex gap-4">
              <div ><a href="#" className="text-white fs-3 border rounded-circle p-2 pt-1"><RiFacebookLine /></a></div>
              <div ><a href="#" className="text-white fs-3 border rounded-circle p-2 pt-1"><CiInstagram /></a></div>
              <div ><a href="#" className="text-white fs-3 border rounded-circle p-2 pt-1"><RiLinkedinLine /></a></div>
            </div>
          </div>
          <div className="col-md-3">
            <h5 className="fs-semibold fs-5 mb-3">Entreprise</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white opacity-75  fw-light">À propos de nous</a></li>
              <li className="mb-2"><a href="#" className="text-white opacity-75 fw-light">Nos services</a></li>
              <li className="mb-2"><a href="#" className="text-white opacity-75 fw-light">Notre équipe</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fs-semibold fs-5 mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-white opacity-75 fw-light"> <CiLocationOn /> Mohammedia,Maroc</li>
              <li className="mb-2 text-white opacity-75 fw-light"> <CiPhone /> +212-652976002</li>
              <li className="mb-2 text-white opacity-75 fw-light"> <AiOutlineMail /> sosc@gmail.com</li>
            </ul>
          </div>
        </div>
        
      </div>
      <div className="d-flex justify-content-between px-5 py-3 align-items-center  bg-primary">
          <div className="col-md-4">
            <img src={logo} className="logo-footer" alt="Logo" />
          </div>
          <div className="col-md-4 text-start text-dark">
            <p className="mb-0">© 2024 <span className="text-secondary">SOSC</span>. All Rights Reserved.</p>
          </div>
          <div className="d-flex gap-5 col-md-4 ">
            <a href="#" className="text-dark fs-6">Politique de confidentialité</a>
            <a href="#" className="text-dark fs-6">Conditions d'utilisation</a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
