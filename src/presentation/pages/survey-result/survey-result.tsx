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
  const [state] = useState({
    isLoading: false,
    error: '',
    SurveyResult: null as LoadSurveyResult.Model,
  });

  useEffect(() => {
    loadSurveyResult.load().then().catch();
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.SurveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é o seu framework web favorito?</h2>
            </hgroup>
            <ul className={Styles.answerList}>
              <li>
                <img src="https://reactnative.dev/img/tiny_logo.png" />
                <span className={Styles.answer}></span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="https://reactnative.dev/img/tiny_logo.png" />
                <span className={Styles.answer}></span>
                <span className={Styles.percent}>50%</span>
              </li>
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
