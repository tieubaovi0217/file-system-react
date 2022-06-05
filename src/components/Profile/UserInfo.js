import { useState, useCallback } from 'react';
import { Layout, Input, Row, Col, Avatar, Modal, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import ReadyPlayerMe from './ReadyPlayerMe';
import { buildPath } from 'common/helpers';
import axios from 'axios';

const { Sider, Content } = Layout;

const UserInfo = ({ username, email }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateAvatar = useCallback(async (json) => {
    // send avatar url to save
    await axios.post(
      buildPath('/user/save-avatar-url'),
      {
        avatarUrl: json.data.url,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      },
    );
    message.success('Save your avatar successfully!');

    // document.getElementById('frame').hidden = true;
    setIsModalVisible(false);
  }, []);

  return (
    <Layout>
      <Sider>
        <div className="flex flex-column justify-content-center">
          <Avatar size={64} icon={<UserOutlined />} />

          <div className="update-avatar-btn">
            <Button
              type="primary"
              onClick={showModal}
              style={{
                boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
              }}
            >
              Update Virtual Avatar
            </Button>
            <Modal
              title="Update Your Avatar"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1100}
            >
              <ReadyPlayerMe onUpdateAvatar={handleUpdateAvatar} />
            </Modal>
          </div>
        </div>
      </Sider>
      <Content>
        <Row gutter={[8, 8]} style={{ paddingLeft: 16 }}>
          <Col className="gutter-row" md={9} xs={24}>
            <Input
              style={{ color: '#264d59' }}
              defaultValue="Username:"
              disabled
            />
          </Col>
          <Col className="gutter-row" md={15} xs={24}>
            <div className="user-info">{username}</div>
          </Col>
          <Col className="gutter-row" md={9} xs={24}>
            <Input
              style={{ color: '#264d59' }}
              defaultValue="Email Address:"
              disabled
            />
          </Col>
          <Col className="gutter-row" md={15} xs={24}>
            <div className="user-info">{email}</div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserInfo;
