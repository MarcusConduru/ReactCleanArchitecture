/* eslint-disable prettier/prettier */
import * as Http from '../utils/http-mocks';
import * as Helper from '../utils/helpers';

const path = /surveys/
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET');

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account);
    })
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve');
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  })

  it('Should present correct username', () => {
    mockUnexpectedError();
    cy.visit('');
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name);
  })
  it('Should logout on logoout link click', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('logout').click();
    Helper.testUrl('/login');
  })
});
