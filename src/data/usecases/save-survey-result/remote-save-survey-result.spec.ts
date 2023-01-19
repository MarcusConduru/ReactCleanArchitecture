import { HttpClientSpy, mockRemoteResultModel } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';
import faker from 'faker';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteSaveSurveyResult', () => {
  test('Should call HttpClient with correct and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteResultModel,
    };
    await sut.save({ answer: faker.random.word() });
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
  });
});
