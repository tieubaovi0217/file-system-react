import { Link, useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Navigation = ({ onLogout }) => {
  // fix this
  const history = useHistory();
  const [current, setCurrent] = useState(history.location.pathname);

  useEffect(() => {
    setCurrent(history.location.pathname);
  }, [history.location.pathname]);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const handleClick = (e) => {
    setCurrent(e.key);
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
            <Button type="primary" onClick={onLogout}>
              Logout
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navigation;
