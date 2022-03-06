import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ResourcesManagementPage from './pages/ResourcesManagementPage';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <ProtectedRoute
          exact
          path="/profile"
          component={UserProfile}
        ></ProtectedRoute>

        {/* <ProtectedRoute
          exact
          path="/resources"
          component={ResourcesManagementPage}
        ></ProtectedRoute> */}

        <Route path="/resources">
          <ResourcesManagementPage />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
