import { message } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import FileBrowserPage from 'pages/FileBrowserPage';
// import EditorPage from 'pages/EditorPage';

import Navigation from 'components/Navigation';
import UserProfile from 'components/Profile';
import ProtectedRoute from 'components/ProtectedRoute';

import { authActions } from 'slices/auth';
import ConferencePage from 'pages/ConferencePage';
import axios from 'axios';

import { buildPath } from 'common/helpers';

message.config({ duration: 1 });

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      try {
        const resp = await axios.get(buildPath('/auth/is_auth'), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });
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
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Route
        path="/"
        render={() => (
          <header id="navigation">
            <Navigation />
          </header>
        )}
      ></Route>

      <main className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          {/* <ProtectedRoute exact path="/editor" component={EditorPage} /> */}
          <ProtectedRoute exact path="/root" component={FileBrowserPage} />
          <ProtectedRoute exact path="/profile" component={UserProfile} />
          <ProtectedRoute exact path="/conference" component={ConferencePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
