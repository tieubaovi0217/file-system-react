import * as moment from 'moment';
import { Modal, Form, Input, Space, Divider, DatePicker, Button } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from 'common/constants';

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const EditModal = ({
  id,
  visible,
  setVisible,
  name,
  startTime,
  endTime,
  title,
  onFinish,
  update = false,
  editors = [],
  timeline = [],
}) => {
  console.log(timeline);

  return (
    <Modal
      title={
        <Divider>
          <h1>{title}</h1>
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
          editors: editors.map((editor) => ({ username: editor.username })),
          timeline: timeline.map((t) => {
            return {
              content: t.content,
              time: moment(t.time),
            };
          }),
        }}
      >
        {update && (
          <Form.Item name="id" label="id">
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
            format={DATE_FORMAT}
          />
        </Form.Item>
        <div style={{ marginLeft: '64px' }}>
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
          <Form.List name="editors">
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
      <Divider />
      <div style={{ textAlign: 'center' }}>
        Or
        <Button
          type="dashed"
          href={process.env.REACT_APP_EDITOR_PAGE_URL}
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
        in your conference (videos, documents, images, banners,...)
      </div>
    </Modal>
  );
};

export default EditModal;
