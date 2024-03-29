import { HttpClientSpy, mockRemoteResultModel } from '@/data/test';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyResult,
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpClient with correct', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteResultModel
    }
    await sut.load()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  });

  test('Should throw AccessDeniedError if HttpClient returns 403 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError)
  });

  test('Should throw UnexpectedError if HttpClient returns 404 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError)
  });

  test('Should throw UnexpectedError if HttpClient returns 500 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError)
  });

  test('Should return a SurveyResult on 200 ', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteResultModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const httpReponse = await sut.load()
    expect(httpReponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  });
});