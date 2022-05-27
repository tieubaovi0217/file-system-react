import './styles.css';
import { useState } from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
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
        console.log(err.response?.data);
        message.error(err.response?.data?.error || 'Server Error');
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
          <Input autoFocus allowClear />
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
          <Input allowClear />
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
          <Input.Password allowClear />
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
          <Input.Password allowClear />
        </Form.Item>
        <Divider />
        <div className="flex justify-content-center">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSigningUp}
            style={{
              boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
            }}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
