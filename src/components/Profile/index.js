import './styles.css';

import { Tabs } from 'antd';
import { getUserFromLocalStorage } from 'common/localStorage';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import UpdateEmail from './UpdateEmail';

const { TabPane } = Tabs;

const UserProfile = () => {
  const user = getUserFromLocalStorage();

  return (
    <section id="profile">
      <h1>General Account Settings</h1>
      <Tabs defaultActiveKey="1" type="card" size={'small'}>
        <TabPane tab="User Profile" key="1">
          <UserInfo username={user.username} email={user.email} />
        </TabPane>
        <TabPane tab="Change Password" key="2">
          <ChangePassword />
        </TabPane>
        <TabPane tab="Update Email" key="3">
          <UpdateEmail />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default UserProfile;
