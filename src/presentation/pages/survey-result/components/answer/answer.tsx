import React from 'react';
import Styles from './answer-styles.scss';
import { SurveyResultAnswerModel } from '@/domain/models';

type Props = {
  answers: SurveyResultAnswerModel;
};

const Answer: React.FC<Props> = ({ answers }: Props) => {
  const activeClassName = answers.isCurrentAccountAnswer ? Styles.active : '';
  return (
    <li
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
    >
      {answers.image && (
        <img data-testid="image" src={answers.image} alt={answers.image} />
      )}
      <span data-testid="answer" className={Styles.answer}>
        {answers.answer}
      </span>
      <span data-testid="percent" className={Styles.percent}>
        {answers.percent}
      </span>
    </li>
  );
};

export default Answer;
