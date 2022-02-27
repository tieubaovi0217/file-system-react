import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

export const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const authCtx = useContext(AuthContext);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (authCtx.isLoggedIn) {
          return Component ? <Component {...props} /> : render(props);
        } else {
          return <Redirect to="/auth/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
