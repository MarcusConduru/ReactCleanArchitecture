import React, { useContext } from 'react';
import Styles from './answer-styles.scss';
import { SurveyResultAnswerModel } from '@/domain/models';
import { SurveyResultContext } from '..';

type Props = {
  answers: SurveyResultAnswerModel;
};

const Answer: React.FC<Props> = ({ answers }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)
  const activeClassName = answers.isCurrentAccountAnswer ? Styles.active : '';
  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }
    onAnswer(answers.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
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
