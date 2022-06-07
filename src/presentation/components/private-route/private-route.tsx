import React, { useContext } from 'react';
import { ApiContext } from '@/presentation/contexts';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
