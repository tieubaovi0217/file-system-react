import { Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from 'components/Auth/LoginForm';
import SignUpForm from 'components/Auth/SignUpForm';
import ForgotPassword from 'components/Auth/ForgotPassword';
import ResetPassword from 'components/Auth/ResetPassword';

import { getUserFromLocalStorage } from 'common/localStorage';

const AuthPage = () => {
  const isAuthenticated = Object.keys(getUserFromLocalStorage()).length > 0;
  console.log(isAuthenticated);
  return (
    <Switch>
      {isAuthenticated && <Redirect to="/" />}
      {!isAuthenticated && (
        <>
          <Route exact path="/auth/login">
            <LoginForm />
          </Route>
          <Route exact path="/auth/signup">
            <SignUpForm />
          </Route>
          <Route exact path="/auth/forgot">
            <ForgotPassword />
          </Route>
          <Route exact path="/auth/reset">
            <ResetPassword />
          </Route>
        </>
      )}
    </Switch>
  );
};

export default AuthPage;
