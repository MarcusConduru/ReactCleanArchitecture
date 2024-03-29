import faker from 'faker';
import { LoadSurveyResult } from '@/domain/usecases';
import { SaveSurveyResult } from '../usecases/save-survey-result';

export const mockSaveSurveyResultParans = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10),
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: false,
    },
  ],
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
export class SaveSurveyResultSpy implements SaveSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();

  async save(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
