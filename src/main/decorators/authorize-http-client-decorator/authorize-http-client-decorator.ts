import { GetStorage } from '@/data/protocols/cache';
import { HttpClient, HttpResponse, HttpRequest } from '@/data/protocols/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly HttpClient: HttpClient,
  ) {}
  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken,
        }),
      });
    }
    const htttpResponse = await this.HttpClient.request(data);
    return htttpResponse;
  }
}
