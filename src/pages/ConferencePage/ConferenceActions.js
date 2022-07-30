import { Dropdown, Menu, Button } from 'antd';
import CreateConference from './CreateConference';

const ConferenceActions = ({
  onShowOwnConferences,
  onShowOnlineConferences,
  onRefresh,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={onShowOwnConferences}>
        * Hiển thị hội nghị của bạn
      </Menu.Item>
      <Menu.Item key="1" onClick={onShowOnlineConferences}>
        * Hiển thị tất cả hội nghị
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
            borderRadius: '16px',
          }}
        >
          Lựa chọn
        </Button>
      </Dropdown>
      <CreateConference onRefresh={onRefresh} />
    </div>
  );
};

export default ConferenceActions;
