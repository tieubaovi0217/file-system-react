import './SignUpForm.css';
import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { signUpUserThunk } from 'actions/auth';
import { useIsMounted } from 'hooks/useIsMounted';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const isMounted = useIsMounted();

  const onFinish = (values) => {
    const { username, password, email, confirmPassword } = values;
    setIsSigningUp(true);
    dispatch(signUpUserThunk({ username, password, email, confirmPassword }))
      .then(() => {
        message.success('Signup Successfully');
        history.push('/');
      })
      .catch((err) => {
        console.log(err.response);
        message.error(err?.response?.data?.message);
      })
      .finally(() => isMounted.current && setIsSigningUp(false));
  };

  return (
    <div className="signup-form">
      <h1>Create your account </h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve(true);
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
