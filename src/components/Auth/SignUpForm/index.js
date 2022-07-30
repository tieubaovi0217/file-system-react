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
      span: 10,
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
        message.success('Đăng ký thành công!');
        history.push('/');
      })
      .catch((err) => {
        console.log(err.response?.data);
        message.error(
          'Tên đăng nhập hoặc địa chỉ Email đã được sử dụng!' ||
            err.response?.data?.error ||
            'Server Error',
        );
      })
      .finally(() => isMounted.current && setIsSigningUp(false));
  };

  return (
    <div className="signup-form">
      <h1>Tạo tài khoản</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              min: 4,
              message: 'Tên đăng nhập chứa ít nhất 4 kí tự!',
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
              message: 'Email không hợp lệ!',
            },
            {
              required: true,
              message: 'Email không để trống!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: 'Mật khẩu không để trống!',
            },
          ]}
          hasFeedback
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Xác nhận mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve(true);
                }

                return Promise.reject(new Error('Không khớp mật khẩu!'));
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
            Đăng ký
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
