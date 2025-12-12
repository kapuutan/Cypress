/// <reference types="cypress" />
import { v4 as uuid } from 'uuid';

describe('E2E: Login + Profile + Change Avatar', () => {
  const username = `user_${Date.now()}`;
  const password = uuid().slice(0, 8);

  before(() => {
    cy.wrap({ username, password }).as('creds');
  });

  it('Логин, проверка сессии, смена аватарки', function () {
    cy.intercept('POST', '/api/auth/login').as('login');

    cy.visit('/sign-in');

    cy.get('[data-test="input-login"]').type(this.creds.username);
    cy.get('[data-test="input-password"]').type(this.creds.password);
    cy.get('[data-test="btn-login"]').click();

    cy.wait('@login').its('response.statusCode').should('eq', 200);

    cy.get('[data-test="header-username"]').should('contain', this.creds.username);

    cy.reload();
    cy.get('[data-test="header-username"]').should('contain', this.creds.username);

    cy.get('[data-test="menu-profile"]').click();

    cy.intercept('GET', '/api/profile').as('profile');
    cy.wait('@profile').its('response.statusCode').should('eq', 200);

    cy.get('[data-test="profile-avatar"]')
      .invoke('attr', 'src')
      .then((oldSrc) => cy.wrap(oldSrc).as('oldAvatar'));

    cy.intercept('POST', '/api/profile/avatar').as('upload');

    cy.get('[data-test="avatar-input"]').selectFile('cypress/fixtures/avatar.jpg', { force: true });
    cy.wait('@upload').its('response.statusCode').should('be.oneOf', [200, 201]);

    cy.get('[data-test="profile-avatar"]')
      .invoke('attr', 'src')
      .should('not.eq', this.oldAvatar)
      .and('include', 'avatar');

    cy.reload();
    cy.get('[data-test="profile-avatar"]')
      .invoke('attr', 'src')
      .should('include', 'avatar');
  });
});
