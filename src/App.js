import { Switch, Route, Redirect } from 'react-router-dom';

// import Layout from 'components/Layout/Layout';
import Navigation from 'components/Navigation';
import UserProfile from 'components/Profile/UserProfile';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ProtectedRoute from 'components/ProtectedRoute';
import FileBrowserPage from 'pages/FileBrowserPage';
import { useDispatch } from 'react-redux';

import { message } from 'antd';
import { useHistory, BrowserRouter } from 'react-router-dom';

import { logoutUserThunk } from 'actions/auth';

message.config({ maxCount: 1, duration: 0.5 });

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    history.replace('/');
    message.success('Logout Successfully');
  };

  return (
    <BrowserRouter>
      <Route
        path="/"
        render={() => (
          <header>
            <Navigation onLogout={handleLogout} />
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
  );
};

export default App;
