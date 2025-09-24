import React from 'react';

const MapIframe = () => {
    return (
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98821.04167047243!2d-76.7028978684449!3d39.2846773609026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c803aed6f483b7%3A0x44896a84223e758!2sBaltimore%2C%20MD%2C%20USA!5e0!3m2!1sen!2sma!4v1730311933179!5m2!1sen!2sma"  
            className='w-100 border-0 m-0 p-0' 
            height="450" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Location"
        >
        </iframe>
    );
};

export default MapIframe;