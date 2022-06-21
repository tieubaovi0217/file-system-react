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
      <h1>General Account Settings</h1>

      <Tabs defaultActiveKey="1" type="card" size={'small'}>
        <TabPane tab="User Profile" key="1">
          <UserInfo {...user} />
        </TabPane>
        <TabPane tab="Change Password" key="2">
          <ChangePassword />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default UserProfile;
