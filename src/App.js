import axios from 'axios';
import { message } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import FileBrowserPage from 'pages/FileBrowserPage';

import Navigation from 'components/Navigation';
import UserProfile from 'components/Profile/UserProfile';
import ProtectedRoute from 'components/ProtectedRoute';

import { authActions } from 'slices/auth';
import ConferencePage from 'pages/ConferencePage';

message.config({ duration: 1 });

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem('token') || '';

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
          <Route exact path="/root" component={FileBrowserPage} />
          <ProtectedRoute exact path="/profile" component={UserProfile} />
          <ProtectedRoute exact path="/conference" component={ConferencePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
