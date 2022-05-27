import { useState } from 'react';
import { Card, Image, Button, Divider, Modal, message } from 'antd';

const ConferenceCard = ({ id, name, thumbnailUrl }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetConferenceID = () => {
    console.log(id);
    message.info('Copied Conference ID to clipboard');
    navigator.clipboard.writeText(id);
  };

  return (
    <div>
      <Card
        title={name}
        style={{
          height: '370px',
          border: '1px solid #c7c7c7',
          borderRadius: '16px',
          opacity: '0.8',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '180px',
          }}
          src={thumbnailUrl}
          alt="Conference Preview"
        />
        <Divider />
        <div className="flex justify-content-center">
          <Button
            type="primary"
            href={process.env.REACT_APP_EDITOR_PAGE_URL}
            target={'_blank'}
            style={{
              marginRight: '24px',
              boxShadow: '2px 2px #0072b5',
            }}
            size={'large'}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={showModal}
            style={{
              boxShadow: '2px 2px #0072b5',
            }}
            size={'large'}
          >
            Click to join!
          </Button>
        </div>
      </Card>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Divider>Instruction</Divider>
        <p>
          Click the following buttons to get Conference ID and paste it into
          your login conference page.
        </p>
        <div className="flex justify-content-center">
          <Button
            style={{ marginRight: '16px', boxShadow: '1px 1px #0072b5' }}
            onClick={handleGetConferenceID}
          >
            Get Conference ID
          </Button>
          <Button
            href={process.env.REACT_APP_EDITOR_PAGE_URL}
            target={'_blank'}
            style={{
              boxShadow: '1px 1px #0072b5',
            }}
          >
            Join conference
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ConferenceCard;
