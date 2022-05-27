import { useState } from 'react';

import { Button, Divider, Modal, Form, Input, Space, DatePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import * as moment from 'moment';

const { RangePicker } = DatePicker;

const CreateConferenceButton = () => {
  const [visible, setVisible] = useState(false);

  const onChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  const onFinish = (values) => {
    console.log(values);
    console.log(values.name);
    const start = new Date(values.date[0]._d);
    const end = new Date(values.date[1]._d);
    console.log(start.getTime());
    console.log(end.getTime());
    console.log(values.users);
  };

  return (
    <>
      <Button
        type="dashed"
        size={'large'}
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
        style={{
          marginLeft: '16px',
          borderRadius: '24px',
          boxShadow: '3px 3px #363945',
        }}
      >
        Create your own conference
      </Button>
      <Modal
        title={
          <Divider>
            <h1>Set up new conference</h1>
          </Divider>
        }
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please type your conference name!',
              },
            ]}
          >
            <Input autoFocus allowClear placeholder="Conference name..." />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                'This Month': [
                  moment().startOf('month'),
                  moment().endOf('month'),
                ],
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onChange}
            />
          </Form.Item>
          <div style={{ marginLeft: '124px' }}>
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'username']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing username',
                          },
                        ]}
                      >
                        <Input
                          style={{ width: '200px' }}
                          placeholder="Username of editor"
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add editor
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div className="flex justify-content-center">
            <Button htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateConferenceButton;
