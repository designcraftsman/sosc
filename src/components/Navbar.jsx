import React from "react";
import logo from '../assets/images/logo.gif';
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-primary">
      <div className="container-fluid d-flex mx-5 justify-content-between">
        <div>
          <a className="navbar-brand fw-bold text-dark" href="." >
            <img src={logo} className="logo" alt="Logo"/>
          </a>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2"><a className="nav-link text-dark fw-bold" href="#">Accueil</a></li>
            <li className="nav-item mx-2"><a className="nav-link text-dark" href="#">Qui sommes-nous</a></li>
            <li className="nav-item mx-2"><a className="nav-link text-dark" href="#">Nos services</a></li>
            <li className="nav-item mx-2"><a className="nav-link text-dark" href="#">Contactez-nous</a></li>
          </ul>
        </div>
        <div>
          <span className="me-4"><span className="fs-4"><CiLocationOn /></span> Mohammedia, Maroc</span>
          <span><span className="fs-4"><CiPhone /></span> +212-652976002</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
