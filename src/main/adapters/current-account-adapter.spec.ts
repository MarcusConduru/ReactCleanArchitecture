/* eslint-disable prettier/prettier */
import { setCurrentAccountAdpter, getCurrentAccountAdpter } from './current-account-adapter';
import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdpter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdpter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should call LocalStorageAdpter.get with correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account);
    const result = getCurrentAccountAdpter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account)
  });
});
