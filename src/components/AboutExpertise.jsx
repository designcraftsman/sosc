import React from 'react';
import credit from "../assets/icons/credit.svg";
import learn from "../assets/icons/learn.svg";
import recover from "../assets/icons/recover.svg";

const AboutExpertise = () => {
    return (
        <div className="container my-5">
            <h2 className="text-primary fs-4 fw-semidbold mb-4">Nos domaines d'expertise</h2>
            <ul className='list-unstyled'>
                <li className="mb-4">
                    <div className='d-flex align-items-start'>
                        <img src={credit} alt="Intermédiation financière" className="me-2" />
                        Intermédiation financière : Solutions de financement personnalisées pour les entreprises et les particuliers, en collaboration avec des institutions financières de premier plan.
                    </div>
                </li>
                <li className="mb-4">
                    <div className='d-flex align-items-start'>
                        <img src={recover} alt="Recouvrement de créances" className="me-2" />
                        Recouvrement de créances : Services spécialisés pour la gestion et la récupération de créances impayées, en garantissant une approche professionnelle et préservant vos relations commerciales.
                    </div>
                </li>
                <li className="mb-4">
                    <div className='d-flex align-items-start'>
                        <img src={learn} alt="Formation en recouvrement" className="me-2" />
                        Formation en recouvrement : Programmes sur mesure pour former vos équipes à la gestion efficace du recouvrement, de la négociation à la gestion des litiges, en passant par la stratégie de prévention.
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default AboutExpertise;
