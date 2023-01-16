import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SurveyResult from './survey-result';
import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
} from '@/domain/test';
import { ApiContext } from '@/presentation/contexts';

type SutType = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const makeSut = (surveyResult = mockSurveyResultModel()): SutType => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  loadSurveyResultSpy.surveyResult = surveyResult;
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>,
  );

  return {
    loadSurveyResultSpy,
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

  test('Should call SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-11T00:00:00'),
    });
    makeSut(surveyResult);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.getByTestId('day')).toHaveTextContent('11');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyResult.question,
    );
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percent = screen.queryAllByTestId('percent')
    expect(percent[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percent[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  });
});
