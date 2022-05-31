import { useState } from 'react';

import axios from 'axios';

import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { buildPath } from 'common/helpers';

import EditModal from './EditModal';

const CreateConference = ({ onRefresh }) => {
  const [visible, setVisible] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    const startTime = values.date[0];
    const endTime = values.date[1];

    try {
      const resp = await axios.post(
        buildPath('/conference'),
        {
          ...values,
          startTime,
          endTime,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      console.log(resp);
      message.success('Create conference successfully!');
      setVisible(false);
      onRefresh();
    } catch (error) {
      console.log(error.response?.data);
      message.error(error.response?.data?.error || 'Server Error');
    }
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
        }}
      >
        Create your conference
      </Button>
      <EditModal
        visible={visible}
        setVisible={setVisible}
        title="Create new conference"
        onFinish={onFinish}
      />
    </>
  );
};

export default CreateConference;
