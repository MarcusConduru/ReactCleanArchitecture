import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  async load(): Promise<void> {
    const httpReponse = await this.httpGetClient.get({ url: this.url });
    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError()
    }
  }
}