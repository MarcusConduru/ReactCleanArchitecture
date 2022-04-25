import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account';
import { UpdateCurrentAccount } from '@/domain/usecases';
import { makeLocalLocalStorage } from '@/main/factories/cache/local-storage-adapeter-factory';

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalLocalStorage());
};
