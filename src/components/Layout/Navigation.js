import { Link, useHistory } from 'react-router-dom';

import { useState } from 'react';
import { Menu, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../store/authActions';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // fix this
  const [state, setState] = useState({
    current: history.location.pathname,
  });

  const handleClick = (e) => {
    setState({ current: e.key });
  };

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      history.replace('/');
      message.success('Logout Successfully', 1);
    });
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      mode="horizontal"
    >
      <Menu.Item key="/">
        <Link to="/">Administration</Link>
      </Menu.Item>

      <Menu.Item key="/root" style={{ marginLeft: 'auto' }}>
        <Link to="/root">Resources</Link>
      </Menu.Item>

      {!isAuthenticated && (
        <>
          <Menu.Item key="/auth/login">
            <Link to="/auth/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/auth/signup">
            <Link to="/auth/signup">Sign Up</Link>
          </Menu.Item>
        </>
      )}

      {isAuthenticated && (
        <>
          <Menu.Item key="/profile">
            <Link to="/profile">
              Profile, {user?.username} <UserOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item key="/auth/logout">
            <Button onClick={logoutHandler}>Logout</Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navigation;
