import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Divider, message } from 'antd';
import EditModal from './EditModal';
import { buildPath } from 'common/helpers';

import { DeleteOutlined } from '@ant-design/icons';

const CardActions = ({ onGetConferenceID, conference, onRefresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      const resp = await axios.delete(
        buildPath(`/conference/${conference.id}`),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      console.log(resp);
      message.success('Delete conference successfully!');
      onRefresh();
    } catch (error) {
      console.log(error.response?.data);
      message.error(error.response?.data?.error || 'Server Error');
    }
  };

  const handleUpdateConference = async (values) => {
    console.log(values);
    const startTime = values.date[0];
    const endTime = values.date[1];
    try {
      const resp = await axios.put(
        buildPath(`/conference/${values.id}`),
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
      message.success('Update conference successfully!');
      setIsEditModalVisible(false);
      onRefresh();
    } catch (error) {
      console.log(error.response?.data);
      message.error(error.response?.data?.error || 'Server Error');
    }
  };

  return (
    <div className="flex justify-content-center">
      <Button
        type="primary"
        style={{
          marginRight: '16px',
        }}
        size={'large'}
        onClick={() => showEditModal()}
      >
        Edit Conference
      </Button>

      <Button
        type="primary"
        onClick={showModal}
        size={'large'}
        style={{
          marginRight: '16px',
        }}
      >
        Click to join!
      </Button>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        size={'large'}
      >
        Delete
      </Button>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Divider>Instruction</Divider>
        <p>
          Click the following buttons to get Conference ID and paste it into
          login conference page.
        </p>
        <div className="flex justify-content-center">
          <Button style={{ marginRight: '16px' }} onClick={onGetConferenceID}>
            Get conference ID
          </Button>
          <Button
            href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
            target={'_blank'}
          >
            Join the conference!
          </Button>
        </div>
      </Modal>
      <EditModal
        visible={isEditModalVisible}
        setVisible={setIsEditModalVisible}
        title="Update conference"
        onFinish={handleUpdateConference}
        update
        {...conference}
      />
    </div>
  );
};

export default CardActions;
