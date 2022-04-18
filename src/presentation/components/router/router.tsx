import SurveyList from '@/presentation/pages/survey-list/survey-list';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

export const Router = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.makeLogin} />
        <Route path="/signup" exact component={factory.makeSignUp} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  );
};
