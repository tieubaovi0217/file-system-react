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
        message.success('Đăng nhập thành công!');
        history.replace('/');
      })
      .catch((err) => {
        console.log(err.response?.data);
        message.error('Sai tài khoản hoặc mật khẩu!' || 'Server Error');
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
            message: 'Xin hãy nhập tên đăng nhập!',
          },
        ]}
      >
        <Input
          allowClear
          autoFocus
          prefix={<UserOutlined />}
          placeholder="Tên đăng nhập"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Xin hãy nhập mật khẩu!',
          },
        ]}
      >
        <Input
          allowClear
          prefix={<LockOutlined />}
          type="password"
          placeholder="Mật khẩu"
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
            Đăng nhập
          </Button>
          <Divider />
          Hoặc <Link to="/auth/signup">Đăng ký ngay!</Link>
          <br />
          Quên mật khẩu?<Link to="/auth/forgot"> Lấy lại mật khẩu!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
