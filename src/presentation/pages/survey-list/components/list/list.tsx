import React from 'react';
import SurveyItemEmpty from '../item-empty/item-empty';
import SurveyItem from '../item/item';
import Styles from './list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases';

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
