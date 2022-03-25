import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import UserProfile from 'components/Profile/UserProfile';
import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import FileBrowserPage from 'pages/FileBrowserPage';
import { useSelector } from 'react-redux';

import { message } from 'antd';

message.config({ maxCount: 1, duration: 0.5 });

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Layout className="layout">
      <Switch>
        <Route exact path="/" component={HomePage} />

        {!isAuthenticated && <Route path="/auth" component={AuthPage} />}

        <ProtectedRoute
          exact
          path="/profile"
          component={UserProfile}
          isAuthenticated={isAuthenticated}
        />

        {/* <ProtectedRoute
          exact
          path="/root"
          component={FileBrowserPage}
          isAuthenticated={isAuthenticated}
        /> */}

        <Route exact path="/root" component={FileBrowserPage} />

        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
