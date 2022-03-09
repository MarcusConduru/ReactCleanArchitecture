import { BrowserRouter, Route, Switch } from 'react-router-dom';

type Props = {
  makeLogin: React.FC;
};

export const Router = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  );
};
