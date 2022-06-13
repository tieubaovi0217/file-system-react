import { useState, useCallback } from 'react';
import { Layout, Input, Row, Col, Modal, Button, message } from 'antd';

import ReadyPlayerMe from './ReadyPlayerMe';
import { buildPath } from 'common/helpers';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { authActions } from '../../slices/auth';
import { useSelector } from 'react-redux';

const { Sider, Content } = Layout;

const UserInfo = ({
  username,
  email,
  phoneNumber = '0912345678',
  address = 'HCMC',
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const avatarUrl = useSelector((state) => state.auth.avatarUrl);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateAvatar = useCallback(
    async (json) => {
      // send avatar URL to save
      try {
        const resp = await axios.post(
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
        console.log(resp.data);
        dispatch(authActions.setUserAvatarURL(resp.data.avatarUrl));
        message.success('Save your avatar successfully!');
        setIsModalVisible(false);
      } catch (error) {
        console.log(error);
        message.error('Update avatar failed!');
      }
    },
    [dispatch],
  );

  return (
    <Layout>
      <Sider width={300} className="user-avatar">
        <div className="flex flex-column justify-content-center">
          {/* <Avatar size={64} icon={<UserOutlined />} /> */}
          <model-viewer
            alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
            src={avatarUrl}
            ar
            auto-rotate
            ar-modes="webxr scene-viewer quick-look"
            seamless-poster
            shadow-intensity="1"
            camera-controls
            enable-pan
            quick-look-browsers="safari chrome"
            background-color="#ffffff"
          ></model-viewer>

          <div className="update-avatar-btn">
            <Button
              type="primary"
              onClick={showModal}
              style={{
                boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
                borderRadius: '16px',
              }}
            >
              Update Virtual Avatar
            </Button>
            <Modal
              keyboard
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
      <Content className="user-info-content">
        <Row gutter={[8, 8]} className="user-list-info">
          <Col className="gutter-row" md={9} xs={24}>
            <Input
              className="user-info-label"
              defaultValue="Username:"
              disabled
            />
          </Col>
          <Col className="gutter-row" md={15} xs={24}>
            <div className="user-info">{username}</div>
          </Col>
          <Col className="gutter-row" md={9} xs={24}>
            <Input
              className="user-info-label"
              defaultValue="Email Address:"
              disabled
            />
          </Col>
          <Col className="gutter-row" md={15} xs={24}>
            <div className="user-info">{email}</div>
          </Col>
          <Col className="gutter-row" md={9} xs={24}>
            <Input
              className="user-info-label"
              defaultValue="Phone Number:"
              disabled
            />
          </Col>
          <Col className="gutter-row" md={15} xs={24}>
            <div className="user-info">{phoneNumber}</div>
          </Col>
          <Col className="gutter-row" md={9} xs={24}>
            <Input
              className="user-info-label"
              defaultValue="Address:"
              disabled
            />
          </Col>
          <Col className="gutter-row" md={15} xs={24}>
            <div className="user-info">{address}</div>
          </Col>
          <Col span={39}></Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserInfo;
