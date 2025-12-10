import {faker} from '@faker-js/faker';

describe('Contact API Tests', () => {
    const apiURL = Cypress.env('apiURL');

    describe('POST /api/submit-form', () => {
        it('Should submit valid contact form data successfully', () => {
            const testData = {
                name: faker.person.firstName() + ' ' + faker.person.lastName(),
                email: faker.internet.email(),
                subject: faker.lorem.sentence(),
                message: faker.lorem.paragraphs(2)
            };

            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: testData
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('message', 'Form submitted successfully');
                expect(response.body).to.have.property('submission');
                expect(response.body.submission).to.have.property('id');
                expect(response.body.submission).to.have.property('name', testData.name);
                expect(response.body.submission).to.have.property('email', testData.email);
                expect(response.body.submission).to.have.property('subject', testData.subject);
                expect(response.body.submission).to.have.property('message', testData.message);
                expect(response.body.submission).to.have.property('submissionDate');
            });
        });

        it('Should reject submission with missing required fields', () => {
            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: {
                    name: 'John Doe',
                    email: 'john@example.com'
                    // message is missing
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.include('required');
            });
        });

        it('Should reject submission with invalid email format', () => {
            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: {
                    name: 'John Doe',
                    email: 'invalid-email',
                    message: 'Test message'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('error');
            });
        });

        it('Should detect and silently reject XSS attack with script tags', () => {
            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: {
                    name: 'Attacker',
                    email: 'attacker@evil.com',
                    subject: 'XSS Test',
                    message: "<script>alert('XSS')</script>"
                }
            }).then((response) => {
                // Should return 200 (silent rejection, attacker thinks it worked)
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', 'Form submitted successfully');
                // Should NOT have submission object (not saved to DB)
                expect(response.body).to.not.have.property('submission');
            });
        });

        it('Should detect XSS attack with iframe tags', () => {
            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: {
                    name: 'Test User',
                    email: 'test@example.com',
                    subject: 'Normal subject',
                    message: '<iframe src="http://evil.com"></iframe>'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Form submitted successfully');
                expect(response.body).to.not.have.property('submission');
            });
        });

        it('Should detect XSS attack with javascript: protocol', () => {
            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: {
                    name: 'Test User',
                    email: 'test@example.com',
                    message: '<a href="javascript:alert(1)">Click me</a>'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.have.property('submission');
            });
        });

        it('Should detect XSS attack with event handlers', () => {
            cy.request({
                method: 'POST',
                url: `${apiURL}/submit-form`,
                body: {
                    name: 'Test User',
                    email: 'test@example.com',
                    message: '<img src=x onerror="alert(1)">'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.have.property('submission');
            });
        });
    });
});