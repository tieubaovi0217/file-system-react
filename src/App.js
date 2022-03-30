import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Navigation from 'components/Navigation';
import UserProfile from 'components/Profile/UserProfile';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ProtectedRoute from 'components/ProtectedRoute';
import FileBrowserPage from 'pages/FileBrowserPage';

import { message } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from 'slices/auth';

message.config({ maxCount: 1, duration: 0.5 });

const errorHandler = (err, info) => {
  console.log('here');
  console.log(err, info);
  // message.error();
};

const resetHandler = () => {
  console.log('reset');
};

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={() => {}}>Try again</button>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem('token');

      if (token === undefined) return;

      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/is_auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(authActions.setCredentials(resp.data));
      } catch (err) {
        console.log(err);
        dispatch(authActions.removeCredentials());
      }
    };

    checkTokenIsValid();
  }, [dispatch]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
      // onReset={resetHandler}
    >
      <BrowserRouter>
        <Route
          path="/"
          render={() => (
            <header>
              <Navigation />
            </header>
          )}
        ></Route>

        <main className="main">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            <ProtectedRoute exact path="/profile" component={UserProfile} />
            <Route exact path="/root" component={FileBrowserPage} />
            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
