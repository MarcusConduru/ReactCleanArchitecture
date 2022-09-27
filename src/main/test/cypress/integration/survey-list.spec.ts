/* eslint-disable prettier/prettier */
import faker from 'faker'
import * as Http from '../support/survey-list-mocks';
import * as Helper from '../support/helpers';

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() });
  });

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve');
  })
});
