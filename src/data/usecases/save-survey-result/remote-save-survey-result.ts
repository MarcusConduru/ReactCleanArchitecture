import { RemoteSurveyResultModel } from '@/data/models/remote-survey-result-model';
import { HttpClient } from '@/data/protocols/http';
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly HttpClient: HttpClient<RemoteSaveSurveyResult.Model>,
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    await this.HttpClient.request({
      url: this.url,
      method: 'put',
      body: params,
    });

    return null;
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
