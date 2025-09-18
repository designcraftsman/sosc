import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import Map from "./Map";
import { useLanguage } from "../context/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-5">
      <div className="container bg-success ">
        <div className="row align-items-center mb-5 p-5">
          {/* Contact Info */}
          <div className="col-md-5 ">
            <div className="icon-underline  mb-3"></div>
            <h3 className="fw-bold mb-3">{t('contactSection.title')}</h3>
            <h4 className="fs-5 fw-medium mb-5">{t('contactSection.subtitle')}</h4>
            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-1 text-secondary">
                <CiLocationOn />
              </div>
              <div><p className="p-0 m-0">Résidence Louma, IMM G1, Etg 1 Apprt 263, BD Palestine, Mohammedia. Maroc</p></div>
            </div>
            

            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-2 text-secondary">
                <AiOutlineMail />
              </div>
              <div><p className="p-0 m-0">sosccarl@gmail.com</p></div>
            </div>

            
            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-1 text-secondary">
                <CiPhone />
              </div>
              <div>
                <p className="p-0 m-0">+212 529 555 101</p>
                <p className="p-0 m-0">+212 529 555 101</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-5 mx-auto">
            <form className="row g-1">
              <div className="mb-3 col-6">
                <input type="text" className="form-control" placeholder={t('contactSection.placeholders.name')} required />
              </div>
              <div className="mb-3 col-6">
                <input type="email" className="form-control" placeholder={t('contactSection.placeholders.email')} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder={t('contactSection.placeholders.subject')} required />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="5" placeholder={t('contactSection.placeholders.message')} required></textarea>
              </div>
              <div>
                <button type="submit" className="btn btn-secondary text-white fw-bold rounded-pill px-4">{t('contactSection.submit')}</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Map />
        </div>
      </div>
      
    </section>
  );
};

export default ContactSection;
