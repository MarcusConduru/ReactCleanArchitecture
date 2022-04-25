/* eslint-disable prettier/prettier */
import * as Helper from './http-mocks';
import faker from 'faker'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/);
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, 'POST');
export const mockOK = (): void => Helper.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName });
export const mockInvalidData = (): void => Helper.mockOk(/signup/, 'POST', { invalid: faker.datatype.uuid() });