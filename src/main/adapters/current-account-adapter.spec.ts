import { setCurrentAccountAdpter } from './current-account-adapter';
import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { UnexpectedError } from '@/domain/errors';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdpter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdpter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });
  
  test('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdpter(undefined);
    }).toThrow(new UnexpectedError())
  });
});
