import { Form, Input, Button, Divider, message } from 'antd';
import axios from 'axios';
import { buildPath } from 'common/helpers';

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
  const onFinish = async (values) => {
    console.log(values);
    try {
      const resp = await axios.post(
        buildPath('/user/changepassword'),
        {
          oldPassword: values.oldPassword,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      console.log(resp);
      message.success('Cập nhật mật khẩu thành công!');
    } catch (error) {
      message.error(error.response?.data?.error || 'Server Error');
    }
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
          label="Mật khẩu hiện tại"
          rules={[
            {
              required: true,
              message: 'Mật khẩu hiện tại không để trống!',
            },
          ]}
        >
          <Input.Password autoFocus allowClear />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: 'Mật khẩu mới không để trống!',
            },
          ]}
          hasFeedback
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Xác nhận mật khẩu mới!',
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
            style={{ borderRadius: '16px' }}
          >
            Cập nhật mật khẩu
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
