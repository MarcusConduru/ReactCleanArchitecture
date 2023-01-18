import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator/authorize-http-client-decorator';
import { makeLocalLocalStorage } from '../cache/local-storage-adapeter-factory';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';
import { HttpClient } from '@/data/protocols/http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    makeLocalLocalStorage(),
    makeAxiosHttpClient(),
  );
};
