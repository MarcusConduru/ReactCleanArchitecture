/* eslint-disable prettier/prettier */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSinup } from '@/main/factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/contexts';
import { getCurrentAccountAdpter, setCurrentAccountAdpter } from '../adapters/current-account-adapter';
import { PrivateRoute } from '@/presentation/components';
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory';
import SurveyResult from '@/presentation/pages/survey-result/survey-result';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider 
      value={{ 
        setCurrentAccount: setCurrentAccountAdpter,
        getCurrentAccount: getCurrentAccountAdpter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSinup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys" exact component={SurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
