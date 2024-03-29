import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SurveyResult from './survey-result';
import {
  LoadSurveyResultSpy,
  SaveSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
} from '@/domain/test';
import { ApiContext } from '@/presentation/contexts';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AccountModel } from '@/domain/models';
import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result/remote-save-survey-result';

type SutType = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutType => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1,
  });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router history={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={new SaveSurveyResultSpy()}
        />
      </Router>
    </ApiContext.Provider>,
  );

  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock,
  };
};

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  // test('Should call SurveyResult data on success', async () => {
  //   const loadSurveyResultSpy = new LoadSurveyResultSpy()
  //   const surveyResult = Object.assign(mockSurveyResultModel(), {
  //     date: new Date('2020-01-11T00:00:00'),
  //   });
  //   loadSurveyResultSpy.surveyResult = surveyResult
  //   makeSut(loadSurveyResultSpy);
  //   await waitFor(() => screen.getByTestId('survey-result'));
  //   expect(screen.getByTestId('day')).toHaveTextContent('11');
  //   expect(screen.getByTestId('month')).toHaveTextContent('jan');
  //   expect(screen.getByTestId('year')).toHaveTextContent('2020');
  //   expect(screen.getByTestId('question')).toHaveTextContent(
  //     surveyResult.question,
  //     );
  //   expect(screen.getByTestId('answers').childElementCount).toBe(2);
  //   const answerWrap = screen.queryAllByTestId('answer-wrap')
  //   expect(answerWrap[0]).toHaveClass('active')
  //   expect(answerWrap[1]).not.toHaveClass('active')
  //   const images = screen.queryAllByTestId('image')
  //   expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
  //   expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
  //   expect(images[1]).toBeFalsy()
  //   const answers = screen.queryAllByTestId('answer')
  //   expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
  //   expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
  //   const percent = screen.queryAllByTestId('percent')
  //   expect(percent[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
  //   expect(percent[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  // });

  // test('Should render error on UnexpectedError', async () => {
  //   const loadSurveyResultSpy = new LoadSurveyResultSpy()
  //   const error = new UnexpectedError();
  //   jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
  //   makeSut(loadSurveyResultSpy);
  //   await waitFor(() => screen.getByTestId('survey-result'));
  //   expect(screen.queryByTestId('question')).not.toBeInTheDocument();
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  //   expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  // });

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError());
    const { history, setCurrentAccountMock } = makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  // test('Should call LoadSurveyResult on reload', async () => {
  //   const loadSurveyResultSpy = new LoadSurveyResultSpy();
  //   jest
  //     .spyOn(loadSurveyResultSpy, 'load')
  //     .mockRejectedValueOnce(new UnexpectedError());
  //   makeSut(loadSurveyResultSpy);
  //   await waitFor(() => screen.getByTestId('survey-result'));
  //   fireEvent.click(screen.getByTestId('reload'));
  //   expect(loadSurveyResultSpy.callsCount).toBe(1);
  //   await waitFor(() => screen.getByTestId('survey-result'));
  // });

  // test('Should goto SurveyList on back button click', async () => {
  //   const { history } = makeSut()
  //   await waitFor(() => screen.getByTestId('survey-result'));
  //   fireEvent.click(screen.getByTestId('back-button'));
  //   expect(history.location.pathname).toBe('/');
  // });

  // test('Should not present Loading on active answer click', async () => {
  //   makeSut()
  //   await waitFor(() => screen.getByTestId('survey-result'));
  //   const answerWrap = screen.queryAllByTestId('answer-wrap')
  //   fireEvent.click(answerWrap[0]);
  //   expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  // });
});
