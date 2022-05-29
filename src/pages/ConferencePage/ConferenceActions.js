import { Dropdown, Menu, Button } from 'antd';
import CreateConference from './CreateConference';

const ConferenceActions = ({
  onShowOwnConferences,
  onShowOnlineConferences,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={onShowOwnConferences}>
        Show Your Conferences
      </Menu.Item>
      <Menu.Item key="1" onClick={onShowOnlineConferences}>
        Show Online Conferences
      </Menu.Item>
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
      <CreateConference />
    </div>
  );
};

export default ConferenceActions;
