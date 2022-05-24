import { Form, Input, Button, Divider } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
};

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form
        {...layout}
        name="change-password"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['oldPassword']}
          label="Old Password"
          rules={[
            {
              required: true,
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
        <Divider />
        <div className="flex justify-content-center">
          <Button size="large" type="primary" htmlType="submit">
            Update Password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
