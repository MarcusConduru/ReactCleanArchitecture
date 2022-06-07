/* eslint-disable prettier/prettier */
import React from 'react'
import SurveyList from '@/presentation/pages/survey-list/survey-list';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSinup } from '@/main/factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/contexts';
import { getCurrentAccountAdpter, setCurrentAccountAdpter } from '../adapters/current-account-adapter';

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
          <Route path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
