import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useFetch from '../../hooks/useFetch';

import './LoginForm.css';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching: isLoading, sendRequest } = useFetch();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    const { username, password } = values;
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;

    sendRequest(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        dispatch(authActions.login(data));
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
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
