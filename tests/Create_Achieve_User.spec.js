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

const iamLocalURL = 'http://iam-local.mldev.cloud:5002';
const iamDevTieURL = 'https://iam-dev.macmillan-learning.com';
const iamDevAchieveURL = 'https://dev-achieve-iam.mldev.cloud';
const iamIntAchieveURL = 'https://int-achieve-iam.mldev.cloud';
const iamProdUrl = 'https://iam.macmillanlearning.com';

// PROBABLY DON'T EDIT PAST HERE

describe('Achieve Hosted Registration', () => {
  it('Should successfully register user', () => {
    cy.visit(`${iamDevTieURL}/register`);
    cy.get('#signup').should('be.disabled');
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#password').type(randomPassword);
    cy.get('#confirmPassword').type(randomPassword);
    cy.get('#email').type(email);
    [1, 2, 3].forEach(i => {
      cy.get(`#Security_Question_${i}__c`).select(questions[i - 1]);
      cy.get(`#Security_Question_${i}_Answer__c`).type('answer');
    });
    cy.get('#institution').type('minn');
    cy.contains('Minnesota').click();
    cy.get('[type="checkbox"]').last().check();
    cy.get('#signup').should('not.be.disabled').click();

    cy.log('USER CREATED');
    cy.log(`Email: ${email}`);
    cy.log(`Password: ${randomPassword}`);
  });
});
