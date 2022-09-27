/* eslint-disable prettier/prettier */
import * as Http from './http-mocks';
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(/login/);
export const mockUnexpectedError = (): void => Http.mockServerError(/login/, 'POST');
export const mockOK = (): void => Http.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName });
