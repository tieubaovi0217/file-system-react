import { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import useFetch from '../../hooks/useFetch';

import './SignUpForm.css';

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
  const history = useHistory();
  const [form] = Form.useForm();

  const authCtx = useContext(AuthContext);

  const { isFetching: isLoading, sendRequest } = useFetch();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    const { username, password, email, confirm } = values;

    const url = `${process.env.REACT_APP_AUTH_API_URL}/signup`;

    sendRequest(
      url,
      { username, password, email, confirmPassword: confirm },
      (data) => {
        console.log(data);
        const { token } = data;
        authCtx.login(token);

        history.replace('/');
      },
    );
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
          name="confirm"
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
