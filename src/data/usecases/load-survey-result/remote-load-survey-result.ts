import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyResult } from '@/domain/usecases';
export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly HttpClient: HttpClient<RemoteLoadSurveyResult.Model>,
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpReponse = await this.HttpClient.request({ 
      url: this.url,
      method: 'get'
    });
    const remoteSurveyResult = httpReponse.body;
    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteSurveyResult, {
          date: new Date(remoteSurveyResult.date),
        });
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: string;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
  };
}
