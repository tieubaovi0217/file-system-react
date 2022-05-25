import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { getUserFromLocalStorage } from 'common/localStorage';

export const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const isAuthenticated = Object.keys(getUserFromLocalStorage()).length > 0;

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
