import { Header, Footer, Spinner } from '@/presentation/components';
import React from 'react';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é o seu framework web favorito?</h2>
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
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
