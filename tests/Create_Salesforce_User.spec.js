const Chance = require('chance');
const chance = new Chance();
const timeStamp = Cypress.moment().format('YYYYMMDDHHmmss');

// FEEL FREE TO EDIT THESE PARTS
const randomEmailString = `${chance.word()}${chance.natural({ min: 100, max: 999 })}`;
const email = `siobhan.mcauley+${randomEmailString}@macmillan.com`;
const randomPassword = `Siob${chance.natural({ min: 1000, max: 9999 })}!`;

const firstName = 'Siobhan';
const lastName = 'McAuley';
const questions = [
  'What is the name of your favorite pet?',
  'What high school did you attend?',
  'What is the name of your first school?',
];

// student store environments, 
const studentStoreDevURL = 'https://ssoqa-macmillan-learning.cs67.force.com/achieve';
const studentStoreProdUrl = 'https://sso.macmillanlearning.com/achieve';



describe('Create User in Salesforce', () => {
  it('Should successfully register user', () => {
    // Change this variable to use different environments
    cy.visit(`${studentStoreDevURL}/customselfreg`);
    cy.get('input.firstname').type('test');
    cy.get('input.lastname').type('testerson');
    cy.get('.dropdown-input').type('minn');
    cy.contains('Minnesota').click();
    cy.get('.email').type(email);
    cy.get('input[type=password]').first().type(randomPassword);
    cy.get('input[type=password]').last().type(randomPassword);
    [1, 2, 3].forEach(i => {
      cy.get(`#ques${i}`).select(questions[i - 1]);
      cy.contains(`Security Question ${i} Answer`).next('input').type('answer');
    });
    cy.get('[type="checkbox"]').last().check();
    cy.get('input.submit').should('not.be.disabled').click();
    cy.log('USER CREATED');
    cy.log(`Email: ${email}`);
    cy.log(`Password: ${randomPassword}`);
  });
});
