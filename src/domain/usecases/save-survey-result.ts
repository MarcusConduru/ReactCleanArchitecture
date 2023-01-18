import { SurveyResultModel } from '../models/survey-result-model';

export interface SaveSurveyResult {
  save: (oarams: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>;
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: string;
  };

  export type Model = SurveyResultModel;
}
