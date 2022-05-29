import { useState } from 'react';
import { Button, Modal, Divider } from 'antd';
import EditModal from './EditModal';

const CardActions = ({ onGetConferenceID, conference }) => {
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

      <Button type="primary" onClick={showModal} size={'large'}>
        Click to join!
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
        {...conference}
      />
    </div>
  );
};

export default CardActions;
