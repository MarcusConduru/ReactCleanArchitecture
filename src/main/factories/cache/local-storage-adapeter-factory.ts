import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

export const makeLocalLocalStorage = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};
