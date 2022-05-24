import { Layout, Input, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const UserInfo = ({ username, email }) => {
  return (
    <Layout>
      <Sider width={240}>
        <div className="flex">
          <div className="user-avatar">
            <Avatar size={80} icon={<UserOutlined />} />
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
