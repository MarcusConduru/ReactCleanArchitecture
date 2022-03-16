import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token';
import { SaveAccessToken } from '@/domain/usecases';
import { makeLocalLocalStorage } from '@/main/factories/cache/local-storage-adapeter-factory';

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalLocalStorage());
};
