import { useState } from 'react';

import { Select, Dropdown, Menu, Button } from 'antd';
import CreateConferenceButton from './CreateConferenceButton';

const { Option } = Select;

const ConferenceActions = () => {
  const [value, setValue] = useState('Show active conferences');

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">abc</Menu.Item>
      <Menu.Item key="1">abc</Menu.Item>
      <Menu.Item key="2">abc</Menu.Item>
    </Menu>
  );

  return (
    <div className="conferences__actions">
      <Dropdown overlay={menu}>
        <Button size={'large'}>Options</Button>
      </Dropdown>
      {/* <Select
        defaultValue={value}
        size={'large'}
        style={{
          width: 280,
          boxShadow: '3px 3px #363945',
        }}
        onChange={handleChange}
      >
        <Option value="active">Show active conferences</Option>
        <Option value="own">Show your own conferences</Option>
      </Select> */}
      <CreateConferenceButton />
    </div>
  );
};

export default ConferenceActions;
