import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return Component ? <Component {...props} /> : render(props);
        } else {
          return <Redirect to="/auth/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
