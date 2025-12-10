import { de } from "@faker-js/faker";

describe('Navigation Tests',()=>{
    describe('Navbar Links',()=>{
        it('Should navigate to Home page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="home-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/');
        });
        it('Should navigate to About page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="about-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/about');
        });
        it('Should navigate to Services - Credit page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="services-dropdown-small"]').click();
            cy.get('[data-cy="credit-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/services/credit');
        });
        it('Should navigate to Services - Recovery page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="services-dropdown-small"]').click();
            cy.get('[data-cy="recovery-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/services/recouvrement');
        });
        it('Should navigate to Services - Courses page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="services-dropdown-small"]').click();
            cy.get('[data-cy="courses-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/services/formations');
        });
        it('Should navigate to FAQ page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="faq-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/faq');
        });
        it('Should navigate to Contact page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="menu-small-open"]').click();
            cy.wait(500);
            cy.get('[data-cy="contact-link-small"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/contact');
        });
    })
    describe('Footer Links',()=>{
        it('Should navigate to About page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="about-footer-link"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/about');
        });
        it('Should navigate to Services page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="services-footer-link"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/services');
        }
        );
        it('Should navigate to Team section in About page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="team-footer-link"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/about#team');
        });
        it('Should navigate to Privacy Policy page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="policy-footer-link"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/policy');
        });
        it('Should navigate to Terms and Conditions page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="terms-footer-link"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/terms');
        });
        it('Should navigate to Legal Mentions page',()=>{
            cy.visit(Cypress.env('baseURL'));
            cy.get('[data-cy="legal-mentions-footer-link"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/legal-mentions');
        });
    })

    describe('Other Navigation Elements',()=>{
        it('Should navigate to Home page when clicking on logo',()=>{
            cy.visit(Cypress.env('baseURL')+'/about');
            cy.get('[data-cy="logo-header"]').click();
            cy.url().should('eq', Cypress.env('baseURL')+'/');
        });
    })
})