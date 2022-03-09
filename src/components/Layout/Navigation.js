import { Link, useHistory } from 'react-router-dom';

import { useState } from 'react';
import { Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [state, setState] = useState({
    current: 'login',
  });

  const handleClick = (e) => {
    setState({ current: e.key });
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace('/auth/login');
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      mode="horizontal"
      style={{ paddingLeft: '16px', paddingRight: '16px' }}
    >
      <Menu.Item key="administration">Administration</Menu.Item>

      <Menu.Item key="resources" style={{ marginLeft: 'auto' }}>
        <Link to="/resources">Resources</Link>
      </Menu.Item>

      {!isAuthenticated && (
        <>
          <Menu.Item key="login">
            <Link to="/auth/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/auth/signup">Sign Up</Link>
          </Menu.Item>
        </>
      )}

      {isAuthenticated && (
        <>
          <Menu.Item key="profile">
            <Link to="/profile">
              Profile, {user?.username} <UserOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button onClick={logoutHandler}>Logout</Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navigation;
