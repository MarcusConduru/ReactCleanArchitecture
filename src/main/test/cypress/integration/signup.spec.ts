/* eslint-disable prettier/prettier */
import * as FormHelper from '../support/form-helpers';
import faker from 'faker';
import * as Http from '../support/signup-mocks';
import * as Helper from '../support/helpers';

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(7));
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.random.alphaNumeric(7);
  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Campo obrigatório');
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('name', 'Valor inválido');
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Valor inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Valor inválido');
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    populateFields();
    FormHelper.testInputStatus('name');
    FormHelper.testInputStatus('email');
    FormHelper.testInputStatus('password');
    FormHelper.testInputStatus('passwordConfirmation');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError();
    simulateValidSubmit();
    FormHelper.testMainError('Esse e-mail já está em uso');
    Helper.testUrl('/signup');
  });

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve',
    );
    Helper.testUrl('/signup');
  });

  it('Should present save account if valid credentials are provied', () => {
    Http.mockOK();
    simulateValidSubmit();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    Helper.testUrl('/');
    Helper.testLocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    Http.mockOK();
    populateFields();
    cy.getByTestId('submit').dblclick();
    Helper.testHttpCallsCount(1);
  });

  it('Should not call sumbit if form is invalid', () => {
    Http.mockOK();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
      Helper.testHttpCallsCount(0);
  });
});
