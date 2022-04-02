import { Link, useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Menu, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from 'actions/auth';

const Navigation = ({ onLogout }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(history.location.pathname);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setCurrent(history.location.pathname);
  }, [history.location.pathname]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    history.replace('/');
    message.success('Logout Successfully');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/">
        <Link to="/">Administration</Link>
      </Menu.Item>

      {!isAuthenticated && (
        <>
          <Menu.Item key="/auth/login" style={{ marginLeft: 'auto' }}>
            <Link to="/auth/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/auth/signup">
            <Link to="/auth/signup">Sign Up</Link>
          </Menu.Item>
        </>
      )}

      {isAuthenticated && (
        <>
          <Menu.Item key="/root" style={{ marginLeft: 'auto' }}>
            <Link to="/root">Resources</Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">
              <div>
                <span>Profile, {user.username} </span>
                <span>
                  <UserOutlined />
                </span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/auth/logout">
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navigation;