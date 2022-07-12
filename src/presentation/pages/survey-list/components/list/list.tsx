import { SurveyModel } from '@/domain/models';
import React, { useContext } from 'react';
import { SurveyContext } from '@/presentation/pages/survey-list/components';
import SurveyItemEmpty from '../item-empty/item-empty';
import SurveyItem from '../item/item';
import Styles from './list-styles.scss'


const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
