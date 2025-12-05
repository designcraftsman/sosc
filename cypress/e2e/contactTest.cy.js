describe('contact',()=>{
    it('contact page loads',()=>{
        cy.visit(Cypress.env('baseURL')+'/contact');
        cy.contains('Contactez-nous');
        cy.get('[placeholder="Nom"]').type("oussama from cy");
        cy.get('[placeholder="Email"]').type("oussama.cy@example.com");
        cy.get('[placeholder="Objet"]').type("Demande de renseignements");
        cy.get('[placeholder="Votre message"]').type("Je souhaite obtenir plus d'informations sur vos services.");
        cy.get('button[type="submit"]').click();
        cy.contains('Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.');
    });
})