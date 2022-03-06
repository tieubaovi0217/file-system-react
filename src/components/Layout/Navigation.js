import { Link, useHistory } from 'react-router-dom';

import { useContext, useState } from 'react';
import { Menu, Button } from 'antd';

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AuthContext from '../../store/auth-context';

const Navigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const [state, setState] = useState({
    current: 'login',
  });

  const handleClick = (e) => {
    setState({ current: e.key });
  };

  const logoutHandler = () => {
    authCtx.logout();
    //TODO: redirect user to login
    history.replace('/auth/login');
  };

  console.log(isLoggedIn);
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      mode="horizontal"
      style={{ paddingLeft: '16px', paddingRight: '16px' }}
    >
      <Menu.Item>Administration</Menu.Item>

      <Menu.Item key="resources" style={{ marginLeft: 'auto' }}>
        <Link to="/resources">Resources</Link>
      </Menu.Item>

      {!isLoggedIn && (
        <>
          <Menu.Item key="login">
            <Link to="/auth/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/auth/signup">Sign Up</Link>
          </Menu.Item>
        </>
      )}

      {isLoggedIn && (
        <Menu.Item key="logout">
          <Button onClick={logoutHandler}>Logout</Button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navigation;
