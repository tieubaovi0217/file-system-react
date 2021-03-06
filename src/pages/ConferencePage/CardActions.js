import { useState } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';
import EditModal from './EditModal';
import { buildPath } from 'common/helpers';

import { DeleteOutlined } from '@ant-design/icons';

const CardActions = ({
  onGetConferenceID,
  conference,
  onRefresh,
  owner = false,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
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
      message.success('Xóa hội nghị thành công');
      onRefresh();
    } catch (error) {
      console.log(error.response?.data);
      message.error(error.response?.data?.error || 'Server Error');
    }
  };

  const handleUpdateConference = async (values) => {
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
      message.success('Cập nhật hội nghị thành công!');
      setIsEditModalVisible(false);
      onRefresh();
    } catch (error) {
      console.log(error.response?.data);
      message.error(error.response?.data?.error || 'Server Error');
    }
  };

  return (
    <div className="flex justify-content-center card-actions">
      <Button
        type="primary"
        size={'large'}
        style={{
          marginRight: '8px',
          borderRadius: '16px',
        }}
        href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
        target={'_blank'}
      >
        Tham gia ngay !
      </Button>
      {owner && (
        <Button
          type="primary"
          style={{
            marginRight: '8px',
            borderRadius: '16px',
          }}
          size={'large'}
          onClick={() => showEditModal()}
        >
          Chỉnh sửa hội nghị
        </Button>
      )}

      {owner && (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          size={'large'}
          style={{
            borderRadius: '16px',
          }}
        >
          Xóa
        </Button>
      )}

      <EditModal
        visible={isEditModalVisible}
        setVisible={setIsEditModalVisible}
        title="Cập nhật hội nghị"
        onFinish={handleUpdateConference}
        update
        {...conference}
      />
    </div>
  );
};

export default CardActions;
