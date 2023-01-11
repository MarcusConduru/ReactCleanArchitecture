import { Header, Footer, Loading, Calendar } from '@/presentation/components';
import React from 'react';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
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
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
