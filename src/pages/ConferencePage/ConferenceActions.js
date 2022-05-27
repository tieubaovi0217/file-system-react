import { Select } from 'antd';

import CreateConferenceButton from './CreateConferenceButton';

const { Option } = Select;

const ConferenceActions = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="conferences__actions">
      <Select
        defaultValue="OPTIONS"
        size={'large'}
        style={{
          width: 280,
          boxShadow: '3px 3px #363945',
        }}
        onChange={handleChange}
      >
        <Option value="jack">Show active conferences</Option>
        <Option value="lucy">Show your own conferences</Option>
      </Select>
      <CreateConferenceButton />
    </div>
  );
};

export default ConferenceActions;
