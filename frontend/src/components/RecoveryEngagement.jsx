import React from 'react';
import solution from '../assets/icons/solution.svg';
import tracking from '../assets/icons/tracking.svg';
import relation from '../assets/icons/relation.svg';
import percent from '../assets/icons/percent.svg';

const RecoveryEngagement = () => {
    return (
        <section className="py-5">
            <div className="container ">
                <h5 className="text-primary fw-semibold mb-5">Engagement de Recouvrement</h5>
                <div className='d-flex align-items-start justify-content-between text-center'>
                    <div className='col-3 px-3'>
                        <img src={percent} alt="Taux de recouvrement élevé" className='mb-4 recovery-engagement-element-icon' />
                        <h3 className='fw-bold fs-5 recovery-engagement-element-title mb-3'>Taux de recouvrement élevé</h3>
                        <p className='text-dark fs-6'>
                            Identification des créances impayées et évaluation de leur degré de risque pour établir une stratégie adaptée.
                        </p>
                    </div>
                    <div className='col-3 px-3'>
                        <img src={relation} alt="Préservation des relations commerciales" className='mb-4 recovery-engagement-element-icon' />
                        <h3 className='fw-bold fs-5 recovery-engagement-element-title mb-3'>Préservation des relations commerciales</h3>
                        <p className='text-dark fs-6'>
                          Nous agissons de manière à conserver une relation positive et professionnelle avec vos clients, même en cas d'impayé
                        </p>
                    </div>
                    <div className='col-3 px-3'>
                        <img src={solution} alt="Solutions sur mesure" className='mb-4 recovery-engagement-element-icon' />
                        <h3 className='fw-bold fs-5 recovery-engagement-element-title mb-3'>Solutions sur mesure</h3>
                        <p className='text-dark fs-6'>
                            Chaque entreprise est unique, c’est pourquoi nos services sont entièrement adaptés à vos besoins spécifiques.Chaque entreprise est unique, c’est pourquoi nos services sont entièrement adaptés à vos besoins spécifiques.
                        </p>
                    </div>
                    <div className='col-3 px-3'>
                        <img src={tracking} alt="Accompagnement transparent et constant" className='mb-4 recovery-engagement-element-icon' />
                        <h3 className='fw-bold fs-5 recovery-engagement-element-title mb-3'>Accompagnement transparent et constant</h3>
                        <p className='text-dark fs-6'>
                            Vous êtes tenu informé de chaque étape du processus avec un suivi rigoureux et un reporting clair.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecoveryEngagement;
