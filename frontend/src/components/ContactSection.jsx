import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import Map from "./Map";
import { useLanguage } from "../context/LanguageContext";


const sanitizeInput = (input) => {
  // Remove potential script tags and dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
      .trim();
};

const valideEmail = (email) =>{
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const ContactSection = () => {
  const { t } = useLanguage();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.name || !formData.email || !formData.message) {
      setSubmitError(t('contactSection.errors.validation'));
      return;
    }

    if(!valideEmail(formData.email)) {
      setSubmitError(t('contactSection.errors.email'));
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    console.log('📤 Sending to backend:', sanitizedData);

    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData) // Send sanitized data
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitError(data.error || t('contactSection.errors.server'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(t('contactSection.errors.connection'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container bg-success ">
        <div className="row align-items-end mb-5 py-5 p-md-5">
          {/* Contact Info */}
          <div className="col-md-5 mb-md-0 mb-4">
            <div className="icon-underline  mb-3"></div>
            <h3 className="fw-bold mb-3">{t('contactSection.title')}</h3>
            <h4 className="fs-5 fw-normal mb-5">{t('contactSection.subtitle')}</h4>
            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-1 text-secondary">
                <CiLocationOn />
              </div>
              <div><p className="p-0 m-0 fw-light">Résidence Louma, IMM G1, Etg 1 Apprt 263, BD Palestine, Mohammedia. Maroc</p></div>
            </div>
            

            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-2 text-secondary">
                <AiOutlineMail />
              </div>
              <div><p className="p-0 m-0 fw-light">sosccarl@gmail.com</p></div>
            </div>

            
            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-1 text-secondary">
                <CiPhone />
              </div>
              <div className="fw-light">
                <p className="p-0 m-0">+212 529 555 101</p>
                <p className="p-0 m-0">+212 529 555 101</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6 mx-auto">
            {!isSubmitted ? (
              <form className="row g-1" onSubmit={handleSubmit}>
                <div className="mb-3 col-6">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    data-cy="name-input"
                    className="form-control rounded-pill px-4 py-3" 
                    placeholder={t('contactSection.placeholders.name')} 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3 col-6">
                  <input 
                    name="email"
                    data-cy="email-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control rounded-pill px-4 py-3" 
                    placeholder={t('contactSection.placeholders.email')} 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    name="subject"
                    data-cy="subject-input"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-control rounded-pill px-4 py-3" 
                    placeholder={t('contactSection.placeholders.subject')} 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <textarea 
                    name="message"
                    data-cy="message-input"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control rounded-5 px-4 py-3" 
                    rows="5" 
                    placeholder={t('contactSection.placeholders.message')} 
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="mb-3">
                    <div className="alert alert-danger rounded-pill px-4 py-2" data-cy="submit-error">
                      {submitError}
                    </div>
                  </div>
                )}
                
                <div>
                  <button 
                    type="submit" 
                    className="btn btn-secondary text-white fw-bold rounded-pill px-4"
                    data-cy="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('contactSection.submitting')}
                      </>
                    ) : (
                      t('contactSection.submit')
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <div className="text-success fs-1 mb-3">
                    ✅
                  </div>
                  <h4 className="text-success fw-bold mb-3">{t('contactSection.success.title')}</h4>
                  <p className="text-muted mb-4" data-cy="success-message">
                    {t('contactSection.success.message')}
                  </p>
                  <button 
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setIsSubmitted(false)}
                  >
                    {t('contactSection.success.button')}
                  </button>
                </div>
              </div>
            )}
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
