import './styles.css';

import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { buildPath } from 'common/helpers';

const ForgotPassword = () => {
  const onFinish = async (values) => {
    try {
      const resp = await axios.post(buildPath('/auth/forgot'), {
        email: values.email,
      });
      console.log(resp);
      message.success(resp.data.message);
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
        <h2>Find your password</h2>
        <p>Please enter your email address to reset for your password.</p>
      </Form.Item>
      <Form.Item
        name="email"
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
        <Input
          allowClear
          autoFocus
          prefix={<MailOutlined />}
          placeholder="Email"
        />
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

export default ForgotPassword;
