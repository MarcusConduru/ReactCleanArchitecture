import { Authentication } from '@/domain/usecases';
import faker from 'faker';
import { AccountModel } from '@/domain/models';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
});
