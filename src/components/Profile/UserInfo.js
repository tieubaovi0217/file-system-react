import axios from 'axios';
import { useState, useCallback } from 'react';
import { Layout, Input, Row, Col, Modal, Button, message, Form } from 'antd';

import { EditOutlined } from '@ant-design/icons';

import ReadyPlayerMe from './ReadyPlayerMe';
import { buildPath } from 'common/helpers';
import { useDispatch } from 'react-redux';

import { authActions } from '../../slices/auth';
import { saveContactInfoToLocalStorage } from 'common/localStorage';

const { Sider, Content } = Layout;

const UserInfo = ({ username, email, phoneNumber, address, avatarUrl }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

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

  const handleUpdateInfo = async (values) => {
    try {
      const resp = await axios.post(
        buildPath('/user'),
        {
          phoneNumber: values.phoneNumber,
          address: values.address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      console.log(resp.data);
      dispatch(
        authActions.setContactInfo({
          phoneNumber: values.phoneNumber,
          address: values.address,
        }),
      );
      saveContactInfoToLocalStorage({
        phoneNumber: values.phoneNumber,
        address: values.address,
      });
      message.success('C???p nh???t th??ng tin c?? nh??n th??nh c??ng!');
    } catch (error) {
      console.log(error);
      message.error('C???p nh???t th??ng tin c?? nh??n th???t b???i!');
    }
  };

  return (
    <Layout>
      <Sider width={300} className="user-avatar">
        <div className="flex flex-column justify-content-center">
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
              C???p nh???t h??nh ?????i di???n 3D
            </Button>
            <Modal
              keyboard
              title="C???p nh???t H??nh ?????i di???n nh??n v???t 3D"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1100}
              cancelText="H???y"
              okText="????ng"
            >
              <ReadyPlayerMe onUpdateAvatar={handleUpdateAvatar} />
            </Modal>
          </div>
        </div>
      </Sider>
      <Content className="user-info-content">
        <Form
          onFinish={handleUpdateInfo}
          initialValues={{ phoneNumber, address }}
        >
          <Row gutter={[8, 8]} className="user-list-info">
            <Col className="gutter-row" md={9} xs={24}>
              <Form.Item>
                <Input
                  className="user-info-label"
                  defaultValue="T??n ????ng nh???p:"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" md={15} xs={24}>
              <div className="user-info">{username}</div>
            </Col>
            <Col className="gutter-row" md={9} xs={24}>
              <Form.Item>
                <Input
                  className="user-info-label"
                  defaultValue="?????a ch??? Email:"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" md={15} xs={24}>
              <div className="user-info">{email}</div>
            </Col>
            <Col className="gutter-row" md={9} xs={24}>
              <Input
                className="user-info-label"
                defaultValue="S??? ??i???n tho???i:"
                disabled
              />
            </Col>

            <Col className="gutter-row" md={15} xs={24}>
              <Form.Item name="phoneNumber">
                <Input
                  className="user-info"
                  defaultValue={phoneNumber}
                  bordered={false}
                  suffix={<EditOutlined className="edit-icon" />}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" md={9} xs={24}>
              <Input
                className="user-info-label"
                defaultValue="?????a ch???:"
                disabled
              />
            </Col>
            <Col className="gutter-row" md={15} xs={24}>
              <Form.Item name="address">
                <Input
                  className="user-info"
                  defaultValue={address}
                  bordered={false}
                  suffix={<EditOutlined className="edit-icon" />}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="update-info-btn">
            <Button block type="primary" htmlType="submit">
              C???p nh???t
            </Button>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

export default UserInfo;
