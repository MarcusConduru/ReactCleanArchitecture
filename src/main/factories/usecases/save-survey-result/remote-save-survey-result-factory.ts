import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '../../http/api-url-factory';
import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result/remote-save-survey-result';
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result';

export const makeSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator(),
  );
};
