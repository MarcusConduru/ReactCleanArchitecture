import { HttpClientSpy, mockRemoteResultModel } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';
import { mockSaveSurveyResultParans } from '@/domain/test';
import faker from 'faker';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

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
  test('Should call HttpClient with corrct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteResultModel,
    };
    const saveSurveyResultParams = mockSaveSurveyResultParans();
    await sut.save(saveSurveyResultParams)
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
  });

  test('Should throw AccessDeniedError if HttpClient returns 403 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockSaveSurveyResultParans())
    await expect(promise).rejects.toThrow(new AccessDeniedError)
  });

  test('Should throw UnexpectedError if HttpClient returns 404 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.save(mockSaveSurveyResultParans())
    await expect(promise).rejects.toThrow(new UnexpectedError);
  });

  test('Should throw UnexpectedError if HttpClient returns 500 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(mockSaveSurveyResultParans())
    await expect(promise).rejects.toThrow(new UnexpectedError)
  });

  test('Should return a SurveyResult on 200 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteResultModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const httpReponse = sut.save(mockSaveSurveyResultParans())
    expect(httpReponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  });
});
