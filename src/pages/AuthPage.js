import { Route, Switch } from 'react-router-dom';

import LoginForm from 'components/Auth/LoginForm';
import SignUpForm from 'components/Auth/SignUpForm';

const AuthPage = () => {
  return (
    <Switch>
      <Route exact path="/auth/login">
        <LoginForm />
      </Route>
      <Route exact path="/auth/signup">
        <SignUpForm />
      </Route>
    </Switch>
  );
};

export default AuthPage;
