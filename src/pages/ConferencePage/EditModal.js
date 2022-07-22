import { useState } from 'react';
import * as moment from 'moment';
import { Modal, Form, Input, Space, Divider, DatePicker, Button } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from 'common/constants';
import { useCallback } from 'react';
import { useIsMounted } from 'hooks/useIsMounted';

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const EditModal = ({
  id,
  visible,
  setVisible,
  name,
  startTime: initialStartTime,
  endTime: initialEndTime,
  title,
  onFinish,
  update = false,
  timeline = [],
}) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const isMounted = useIsMounted();

  const handleOk = useCallback(() => {
    if (isMounted) {
      setVisible(false);
    }
  }, [setVisible, isMounted]);

  return (
    <Modal
      keyboard
      title={
        <Divider>
          <h1 className="edit-conference-modal__heading">{title}</h1>
        </Divider>
      }
      centered
      destroyOnClose
      visible={visible}
      onOk={handleOk}
      onCancel={handleOk}
      width={800}
      className="edit-conference-modal"
    >
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 22,
        }}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{
          id: id,
          name: name,
          date: [moment(startTime), moment(endTime)],
          timeline: timeline.map((t) => {
            return {
              content: t.content,
              time: moment(t.time),
            };
          }),
        }}
      >
        {update && (
          <Form.Item name="id" label="id" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
        )}
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
          rules={[
            { required: true, message: 'Please select date' },
            () => ({
              validator(_, value) {
                setStartTime(value[0]);
                setEndTime(value[1]);
                return Promise.resolve(true);
              },
            }),
          ]}
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
            format={DATE_FORMAT}
          />
        </Form.Item>
        <div className="edit-conference__timeline">
          <Form.List name="timeline">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                    }}
                    align="start"
                  >
                    <Form.Item
                      name={[name, 'time']}
                      rules={[
                        {
                          required: true,
                          message: 'Date required',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              (value >= moment(startTime) &&
                                value <= moment(endTime))
                            ) {
                              return Promise.resolve(true);
                            }

                            return Promise.reject(
                              new Error('Must be in range (start, end)!'),
                            );
                          },
                        }),
                      ]}
                    >
                      <DatePicker showTime format={DATE_FORMAT} />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'content']}
                      rules={[
                        {
                          required: true,
                          message: 'Content required',
                        },
                      ]}
                    >
                      <TextArea
                        showCount
                        allowClear
                        maxLength={100}
                        placeholder="Content...."
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
                    Add Timeline
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <div className="flex justify-content-center">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            style={{ width: '100%', borderRadius: '16px' }}
          >
            SUBMIT
          </Button>
        </div>
      </Form>
      <Divider />
      <div style={{ textAlign: 'center' }}>
        Or
        <Button
          type="dashed"
          href={`${process.env.REACT_APP_API_URL}/EditorPage`}
          target={'_blank'}
          style={{
            marginRight: '8px',
            marginLeft: '8px',
            borderRadius: '20px',
          }}
          size={'large'}
        >
          Edit Resources
        </Button>
        in your conference (videos, documents Word, PDF, PowerPoint, images,
        banners,...)
      </div>
    </Modal>
  );
};

export default EditModal;
