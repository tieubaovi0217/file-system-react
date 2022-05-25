import { Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from 'components/Auth/LoginForm';
import SignUpForm from 'components/Auth/SignUpForm';

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
        </>
      )}
    </Switch>
  );
};

export default AuthPage;
