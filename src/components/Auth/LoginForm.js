import './LoginForm.css';
import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticating = useSelector((state) => state.auth.isAuthenticating);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    const { username, password } = values;
    dispatch(loginUser({ username, password }))
      .then(() => {
        message.success('Login Successfully', 1);
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message, 1);
      });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {/* TODO: fix this temporary style */}
      <Form.Item style={{ textAlign: 'center' }}>
        <LockOutlined style={{ fontSize: '28px' }} />
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
            className="login-form-button"
            loading={isAuthenticating}
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
