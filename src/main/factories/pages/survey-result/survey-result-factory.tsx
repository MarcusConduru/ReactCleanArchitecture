/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import SurveyResult from '@/presentation/pages/survey-result/survey-result';
import { makeLoadSurveyResult } from '../../usecases/load-survey-result/remote-load-survey-result-factory';
import { useParams } from 'react-router-dom';
import { makeSaveSurveyResult } from '../../usecases/save-survey-result/remote-save-survey-result-factory';

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<any>();
  return (
    <SurveyResult
      loadSurveyResult={makeLoadSurveyResult(id)}
      saveSurveyResult={makeSaveSurveyResult(id)}
    />
  );
};
