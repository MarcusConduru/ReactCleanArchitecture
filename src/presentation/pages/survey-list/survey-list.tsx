import { LoadSurveyList } from '@/domain/usecases';
import { Error, Footer, Header } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import React, { useEffect, useState } from 'react';
import { SurveyContext, SurveyListItem } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handlerError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message });
  });

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  const reload = (): void =>
    setState((old) => ({ surveys: [], error: '', reload: !old.reload }));
  
  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState({ ...state, surveys });
      })
      .catch(handlerError);
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? (
            <Error error={state.error} reload={reload} />
          ) : (
            <SurveyListItem />
          )}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
