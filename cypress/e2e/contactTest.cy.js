import {faker} from '@faker-js/faker';

describe('Contact Page ',()=>{

    it('Should Open contact page with 200 http response',()=>{
        cy.visit(Cypress.env('baseURL')+'/contact');
    });

    describe('Form Submission',()=>{
        it('With XSS payload , should sanitize the script input',()=>{
            cy.visit(Cypress.env('baseURL')+'/contact');
            cy.contains('Contactez-nous');
            cy.get('[data-cy="name-input"]').type(faker.person.firstName() + ' ' + faker.person.lastName());
            cy.get('[data-cy="email-input"]').type(faker.internet.email());
            cy.get('[data-cy="subject-input"]').type(faker.lorem.sentence());
            cy.get('[data-cy="message-input"]').type("<script>alert('XSS');</script>");
            cy.get('[data-cy="submit-button"]').click();
        });

        it('With valid data , should submit successfully',()=>{
            cy.visit(Cypress.env('baseURL')+'/contact');
            cy.get('[data-cy="name-input"]').type(faker.person.firstName() + ' ' + faker.person.lastName());
            cy.get('[data-cy="email-input"]').type(faker.internet.email());
            cy.get('[data-cy="subject-input"]').type(faker.lorem.sentence());
            cy.get('[data-cy="message-input"]').type(faker.lorem.paragraphs(2));
            cy.get('[data-cy="submit-button"]').click();
            cy.get('[data-cy="success-message"]')
                .should('be.visible')
                .should('contain','Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.');
        });

        it("With empty data, should show validation errors",()=>{
            cy.visit(Cypress.env('baseURL')+'/contact');
            cy.get('[data-cy="submit-button"]').click();
            cy.get('[data-cy="submit-error"]')
                .should('be.visible')
                .should('contain', 'Veuillez remplir tous les champs.');
        
        });

        it("With invalid email, should show email error",()=>{
            cy.visit(Cypress.env('baseURL')+'/contact');
            cy.get('[data-cy="email-input"]').type("oussa@hacker");
            cy.get('[data-cy="name-input"]').type(faker.person.firstName() + ' ' + faker.person.lastName());
            cy.get('[data-cy="email-input"]').type(faker.internet.email());
            cy.get('[data-cy="subject-input"]').type(faker.lorem.sentence());
            cy.get('[data-cy="message-input"]').type(faker.lorem.paragraphs(2));
            cy.get('[data-cy="submit-button"]').click();
            cy.get('[data-cy="submit-error"]')
                .should('be.visible')
                .should('contain', 'Veuillez entrer une adresse e-mail valide.');
        });
    });
})