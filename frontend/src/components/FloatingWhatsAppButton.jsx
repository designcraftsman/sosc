import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
  const phoneNumber = '21612345678'; // Replace with actual WhatsApp number (format: country code + number, no + or spaces)
  const message = 'Bonjour, je voudrais obtenir plus d\'informations'; // Default message
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button 
      className="floating-whatsapp-button" 
      onClick={handleWhatsAppClick}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </button>
  );
};

export default FloatingWhatsAppButton;
