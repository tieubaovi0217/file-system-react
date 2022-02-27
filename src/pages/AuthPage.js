import { Route } from 'react-router-dom';

import LoginForm from '../components/Auth/LoginForm';
import SignUpForm from '../components/Auth/SignUpForm';

const AuthPage = () => {
  return (
    <>
      <Route path="/auth/login" exact>
        <LoginForm />
      </Route>
      <Route path="/auth/signup" exact>
        <SignUpForm />
      </Route>
    </>
  );
};

export default AuthPage;
