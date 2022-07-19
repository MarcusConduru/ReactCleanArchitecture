import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { makeLocalLocalStorage } from '../cache/local-storage-adapeter-factory';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';
import { HttpGetClient } from '@/data/protocols/http';

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalLocalStorage(),
    makeAxiosHttpClient(),
  );
};
