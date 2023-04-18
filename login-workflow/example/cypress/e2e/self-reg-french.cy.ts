/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('Language french', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display self register in french', () => {
        cy.contains('Change Language-FR').click();
        cy.contains('Créer un compte').click();
        cy.contains('Accord de Licence');
        cy.contains('accepte les conditions');
        cy.get('[type="checkbox"]').check();
        cy.contains('Prochain').should('be.enabled').click();
        cy.contains('Créer un compte');
        cy.get('#email-label').should('contain', 'Adresse e-mail');
        cy.get('#email').type('test@test.com');
        cy.contains('Prochain').should('be.enabled').click();
        cy.contains('Vérifier les courriels');
        cy.get('#code-label').should('contain', 'Code de vérification');
        cy.get('#code').click().type('123');
        cy.contains('Envoyer à nouveau').click();
        cy.contains('Prochain').should('be.enabled').click();
        cy.contains('Créer un Mot de Passe');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Prochain').should('be.enabled').click();
        cy.contains('Détails du Compte');
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Prochain').should('be.enabled').click();
        cy.contains('Compte Créé!');
    });
});
