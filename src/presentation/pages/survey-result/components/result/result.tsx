import React from 'react';
import Styles from './result-styles.scss';
import { Calendar } from '@/presentation/components';
import { useHistory } from 'react-router-dom';
import { LoadSurveyResult } from '@/domain/usecases';
import { SurveyResultAnswer } from '..';

type Props = {
  SurveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<Props> = ({ SurveyResult }: Props) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={SurveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{SurveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answerList}>
        {SurveyResult.answers.map((answers) => (
          <SurveyResultAnswer key={answers.answer} answers={answers} />
        ))}
      </ul>
      <button
        className={Styles.button}
        data-testid="back-button"
        onClick={goBack}
      >
        Voltar
      </button>
    </>
  );
};

export default Result;
