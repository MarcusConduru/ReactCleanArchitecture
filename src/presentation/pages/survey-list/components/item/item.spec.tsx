import React from 'react';
import SurveyItem from './item';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockSurveyModel } from '@/domain/test';
import { IconName } from '@/presentation/components';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  );

  return {
    history
  }
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-11T00:00:00'),
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('11');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00'),
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown,
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });

  // test('Should go to SurveyResult', () => {
  //   const survey = mockSurveyModel()
  //   fireEvent.click(screen.getByTestId('link'))
  //   const { history } = makeSut(survey)
  //   expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  // });
});
