import { Header, Footer, Loading, Error } from '@/presentation/components';
import React, { useEffect, useState } from 'react';
import Styles from './survey-result-styles.scss';
import { LoadSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyResultContext, SurveyResultData } from './components';
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handlerError = useErrorHandler((error: Error) => {
    setState({ ...state, SurveyResult: null, error: error.message });
  });

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    SurveyResult: null as LoadSurveyResult.Model,
    reload: false,
  });

  const onAnswer = (answer: string): void => {
    setState(old => ({...old, isLoading: true})
    saveSurveyResult.save({ answer }).then().catch()
  }

  const reload = (): void =>
    setState((old) => ({
      isLoading: false,
      SurveyResult: null,
      error: '',
      reload: !old.reload,
    }));

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((old) => ({ ...old, surveyResult }));
      })
      .catch(handlerError);
  }, [state.reload]);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.SurveyResult && (
            <SurveyResultData SurveyResult={state.SurveyResult} />
          )}
          {state.isLoading && <Loading />}
          {state.isLoading && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyResult;
