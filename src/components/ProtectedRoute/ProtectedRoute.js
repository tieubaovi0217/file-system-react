import { message } from 'antd';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    message.error('Please login to access this page!', 1);
    return <Redirect to="/auth/login" />;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
