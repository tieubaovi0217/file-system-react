import './SignUpForm.css';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

import { signUpUser } from '../../store/authActions';

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

  const isSigningUp = useSelector((state) => state.auth.isAuthenticating);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    const { username, password, email, confirmPassword } = values;
    dispatch(signUpUser({ username, password, email, confirmPassword }))
      .then(() => {
        message.success('Signup Successfully');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message, 1);
      });
  };

  return (
    <div className="signup-wrapper">
      <h1>Create your account </h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        className="signup-form"
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
                  return Promise.resolve();
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
