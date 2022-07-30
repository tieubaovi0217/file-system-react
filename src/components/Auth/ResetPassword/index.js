import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';

import { buildPath } from 'common/helpers';

const ResetPassword = () => {
  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const token = params.get('token');

  const onFinish = async (values) => {
    try {
      const resp = await axios.post(
        buildPath('/user/changepassword'),
        {
          isReset: true,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || ''}`,
          },
        },
      );
      console.log(resp);
      message.success('Your password has been reset!');
    } catch (err) {
      console.log(err.response?.data);
      message.error(err.response?.data?.error || 'Server Error');
    }
  };

  return (
    <Form
      className="reset-form"
      onFinish={onFinish}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px',
      }}
    >
      <Form.Item>
        <h2>Reset New Password</h2>
        <p>Please enter your new password (at least 4 characters)</p>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password allowClear placeholder="New Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
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

              return Promise.reject(new Error('Không khớp mật khẩu!'));
            },
          }),
        ]}
      >
        <Input.Password allowClear placeholder="Confirm new password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="reset-form__button"
          style={{
            boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;
