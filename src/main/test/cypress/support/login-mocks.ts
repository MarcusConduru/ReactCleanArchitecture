/* eslint-disable prettier/prettier */
import * as Helper from './http-mocks';
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/);
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/, 'POST');
export const mockOK = (): void => Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid() });
export const mockInvalidData = (): void => Helper.mockOk(/login/, 'POST', { invalid: faker.datatype.uuid() });
