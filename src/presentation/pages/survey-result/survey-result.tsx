import {
  Header,
  Footer,
  Loading,
  Calendar,
  Error,
} from '@/presentation/components';
import React, { useEffect, useState } from 'react';
import Styles from './survey-result-styles.scss';
import { LoadSurveyResult } from '@/domain/usecases';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    SurveyResult: null as LoadSurveyResult.Model,
  });

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((old) => ({ ...old, surveyResult })));
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.SurveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.SurveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid="question">{state.SurveyResult.question}</h2>
            </hgroup>
            <ul data-testid="answers" className={Styles.answerList}>
              {state.SurveyResult.answers.map((answers) => (
                <li
                  data-testid="answer-wrap"
                  key={answers.answer}
                  className={
                    answers.isCurrentAccountAnswer ? Styles.active : ''
                  }
                >
                  {answers.image && (
                    <img
                      data-testid="image"
                      src={answers.image}
                      alt={answers.image}
                    />
                  )}
                  <span data-testid="answer" className={Styles.answer}>
                    {answers.answer}
                  </span>
                  <span data-testid="percent" className={Styles.percent}>
                    {answers.percent}
                  </span>
                </li>
              ))}
            </ul>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.isLoading && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
