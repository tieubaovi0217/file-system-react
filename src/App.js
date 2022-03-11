import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FileBrowserPage from './pages/FileBrowserPage';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Layout className="layout">
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        {!isAuthenticated && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        {isAuthenticated && (
          <>
            <ProtectedRoute
              exact
              path="/profile"
              component={UserProfile}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/root"
              component={FileBrowserPage}
            ></ProtectedRoute>
          </>
        )}

        {/* <Route path="/root">
          <FileBrowserPage />
        </Route> */}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
