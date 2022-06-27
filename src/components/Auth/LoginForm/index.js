import './styles.css';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Form, Input, Button, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { loginUserThunk } from 'actions/auth';
import { useIsMounted } from 'hooks/useIsMounted';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const isMounted = useIsMounted();

  const onFinish = (values) => {
    const { username, password } = values;

    setIsLoggingIn(true);
    dispatch(loginUserThunk(username, password))
      .then(() => {
        message.success('Login Successfully');
        history.replace('/');
      })
      .catch((err) => {
        console.log(err.response?.data);
        message.error(err.response?.data?.error || 'Server Error');
      })
      .finally(() => isMounted.current && setIsLoggingIn(false));
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px',
      }}
    >
      <Form.Item>
        <LockOutlined className="lock-circle" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          allowClear
          autoFocus
          prefix={<UserOutlined />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          allowClear
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
            loading={isLoggingIn}
            style={{
              boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
            }}
          >
            Log In
          </Button>
          <Divider />
          Or <Link to="/auth/signup">Register now!</Link>
          <br />
          Forgot your password?<Link to="/auth/forgot"> Reset now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
