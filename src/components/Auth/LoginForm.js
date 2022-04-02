import './LoginForm.css';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';
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
        console.log(err.response.data);
        message.error(err.response.data.message);
      })
      .finally(() => isMounted.current && setIsLoggingIn(false));
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
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
          prefix={<UserOutlined className="site-form-item-icon" />}
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
          prefix={<LockOutlined className="site-form-item-icon" />}
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
          >
            Log In
          </Button>
          Or <Link to="/auth/signup">Register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
