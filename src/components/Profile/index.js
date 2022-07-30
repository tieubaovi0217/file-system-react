import './styles.css';

import { Tabs } from 'antd';
import UserInfo from './UserInfo';
import { useSelector } from 'react-redux';
import ChangePassword from './ChangePassword';

const { TabPane } = Tabs;

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <section id="profile">
      <h1>Thông tin chung</h1>

      <Tabs defaultActiveKey="1" type="card" size={'small'}>
        <TabPane tab="Thông tin cá nhân" key="1">
          <UserInfo {...user} />
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
          <ChangePassword />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default UserProfile;
