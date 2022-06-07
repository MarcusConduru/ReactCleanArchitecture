/* eslint-disable prettier/prettier */
import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { makeLocalLocalStorage } from '../factories/cache/local-storage-adapeter-factory';

export const setCurrentAccountAdpter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalLocalStorage().set('account', account);
};

export const getCurrentAccountAdpter = (): AccountModel => {
  return makeLocalLocalStorage().get('account');
};
