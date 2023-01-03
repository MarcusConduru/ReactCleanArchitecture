import { HttpGetClientSpy, mockRemoteResultModel } from '@/data/test';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyResult,
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteResultModel
    }
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  });

  test('Should throw AccessDeniedError if HttpGetClient returns 403 ', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError)
  });

  test('Should throw UnexpectedError if HttpGetClient returns 404 ', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError)
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500 ', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError)
  });

  test('Should return a SurveyResult on 200 ', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteResultModel()
    httpGetClientSpy.response = {
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