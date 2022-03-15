import { message } from 'antd';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({
  path,
  component: Component,
  render,
  isAuthenticated,
  ...rest
}) => {
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
