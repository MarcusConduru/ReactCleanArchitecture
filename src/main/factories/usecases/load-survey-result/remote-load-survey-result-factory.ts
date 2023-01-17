import { LoadSurveyResult } from '@/domain/usecases';
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '../../http/api-url-factory';
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result';

export const makeLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpGetClientDecorator(),
  );
};
