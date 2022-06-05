import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Menu, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from 'actions/auth';

const Navigation = () => {
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
    <Menu
      className="navigation"
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{
        letterSpacing: '1.5px',
        padding: '4px',
        fontSize: '110%',
        boxShadow:
          'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
      }}
    >
      <Menu.Item key="/">
        <Link to="/">VIRTUAL CONFERENCE</Link>
      </Menu.Item>

      {!isAuthenticated && (
        <>
          <Menu.Item key="/auth/login" className="margin-left-auto">
            <Link to="/auth/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/auth/signup">
            <Link to="/auth/signup">Sign Up</Link>
          </Menu.Item>
        </>
      )}

      {isAuthenticated && (
        <>
          <Menu.Item key="/root" className="margin-left-auto">
            <Link to="/root">Resources</Link>
          </Menu.Item>
          {/* <Menu.Item key="/editor">
            <Link to="/editor">Edit Conference</Link>
          </Menu.Item> */}
          <Menu.Item key="/conference">
            <Link to="/conference">Conferences</Link>
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
