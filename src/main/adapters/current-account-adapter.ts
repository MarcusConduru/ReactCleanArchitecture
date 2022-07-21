/* eslint-disable prettier/prettier */
import { AccountModel } from '@/domain/models';
import { makeLocalLocalStorage } from '../factories/cache/local-storage-adapeter-factory';

export const setCurrentAccountAdpter = (account: AccountModel): void => {
  makeLocalLocalStorage().set('account', account);
};

export const getCurrentAccountAdpter = (): AccountModel => {
  return makeLocalLocalStorage().get('account');
};
