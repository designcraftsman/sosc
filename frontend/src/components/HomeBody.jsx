import React from 'react';
import Services from './Services';
import Mission from './Mission';
import About from './About';
import FinancialPartners from './FinancialPartner';
import bg1 from '../assets/images/homeBody/1.jpg';
import bg2 from '../assets/images/homeBody/2.jpg';

const HomeBody = () => {
    return (
        <div className='container-fluid p-0'>
            <img src={bg1} className='img-fluid' alt="" />
            <Services />
            <FinancialPartners />
            <About />
            <Mission />
            <img src={bg2} className='img-fluid' alt="" />
        </div>
    );
};

export default HomeBody;
