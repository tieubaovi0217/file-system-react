import { useState, useEffect } from 'react';
import { Layout, Input, Row, Col, Avatar, Modal, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { buildPath } from 'common/helpers';

const { Sider, Content } = Layout;

const UserInfo = ({ username, email }) => {
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

  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  // eslint-disable-next-line no-unused-vars
  function displayIframe() {
    document.getElementById('frame').hidden = false;
  }

  // function openIframe() {
  //   document.getElementById('frame').hidden = true;
  // }

  function subscribe(event) {
    const json = parse(event);

    if (json?.source !== 'readyplayerme') {
      return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
      // eslint-disable-next-line no-undef
      frame.contentWindow.postMessage(
        JSON.stringify({
          target: 'readyplayerme',
          type: 'subscribe',
          eventName: 'v1.**',
        }),
        '*',
      );
    }

    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
      console.log(`Avatar URL: ${json.data.url}`);
      document.getElementById(
        'avatarUrl',
      ).innerHTML = `Avatar URL: ${json.data.url}`;

      // send avatar url to save
      axios.post(
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

      document.getElementById('frame').hidden = true;
    }

    // Get user id
    if (json.eventName === 'v1.user.set') {
      console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      const subdomain = process.env.REACT_APP_API_READY_PLAYER_ME_SUB_DOMAIN; // Replace with your custom subdomain

      const frame = document.getElementById('frame');
      if (!frame.src) {
        frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

        window.addEventListener('message', subscribe);
        document.addEventListener('message', subscribe);
      }
    }

    return () => {
      window.removeEventListener('message', subscribe);
      document.removeEventListener('message', subscribe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible]);

  return (
    <Layout>
      <Sider width={240}>
        <div className="flex flex-column justify-content-center">
          <Avatar size={80} icon={<UserOutlined />} />

          <div className="update-avatar-btn">
            <Button type="primary" onClick={showModal}>
              Update Virtual Avatar
            </Button>
            <Modal
              title="Update Your Avatar"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1100}
            >
              <iframe
                id="frame"
                className="frame"
                allow="camera *; microphone *"
                title="ready_player_me"
              ></iframe>
            </Modal>
          </div>
        </div>
      </Sider>
      <Content>
        <Row gutter={[16, 24]} style={{ paddingLeft: 16 }}>
          <Col className="gutter-row" span={6}>
            <Input defaultValue="Username:" disabled />
          </Col>
          <Col className="gutter-row" span={18}>
            <div className="user-info">{username}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <Input defaultValue="Email Address:" disabled />
          </Col>
          <Col className="gutter-row" span={18}>
            <div className="user-info">{email}</div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserInfo;
