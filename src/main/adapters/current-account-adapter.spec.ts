import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { setCurrentAccountAdpter } from './current-account-adapter';

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdpter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdpter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });
});
