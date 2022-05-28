import { Dropdown, Menu, Button } from 'antd';
import CreateConferenceButton from './CreateConferenceButton';

const ConferenceActions = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">Show Your Conferences</Menu.Item>
    </Menu>
  );

  return (
    <div className="conferences__actions">
      <Dropdown overlay={menu}>
        <Button
          size={'large'}
          style={{
            padding: '0 100px',
          }}
        >
          Options
        </Button>
      </Dropdown>
      <CreateConferenceButton />
    </div>
  );
};

export default ConferenceActions;
