import faker from 'faker';
import { RemoteLoadSurveyResult } from '../usecases/load-survey-result/remote-load-survey-result';

export const mockRemoteResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(100),
      percent: faker.datatype.number(100),
    },
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(100),
      percent: faker.datatype.number(100),
    },
  ],
});
