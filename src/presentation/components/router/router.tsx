import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from '@/presentation/pages/signup/signup';

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
      </Switch>
    </BrowserRouter>
  );
};
