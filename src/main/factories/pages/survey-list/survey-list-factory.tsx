import React from 'react';
import SurveyList from '@/presentation/pages/survey-list/survey-list';
import { makeLoadSurveyList } from '../../usecases/load-survey-list/remote-load-survey-list-factory';

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeLoadSurveyList()} />;
};
