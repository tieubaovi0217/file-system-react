import './styles.css';

import { Col, Row, Select, Divider } from 'antd';

import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

import ConferenceCard from './ConferenceCard';
import CreateConferenceButton from './CreateConferenceButton';

import TimeLine from './TimeLine';

const { Option } = Select;

const thumbnailURLs = [
  'https://mootup.com/wp-content/uploads/2020/07/Zoom-webinar-3d-8.8-screens.png',
  'https://i.ytimg.com/vi/COEgicWT9XM/maxresdefault.jpg',
  'https://venturebeat.com/wp-content/uploads/2020/07/vFairs.jpg?resize=1024%2C590&strip=all',
  'https://eventsolutions.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-16-at-3.40.48-PM1-845x321.png',
];

const ConferencePage = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="conferences">
      <h1 className="heading">
        <span>
          <Texty>CONFERENCES</Texty>
        </span>
      </h1>
      <div className="conferences__actions">
        <Select
          defaultValue="OPTIONS"
          size={'large'}
          style={{
            width: 280,
          }}
          onChange={handleChange}
        >
          <Option value="jack">Show active conferences</Option>
          <Option value="lucy">Show your own conferences</Option>
        </Select>
        <CreateConferenceButton />
      </div>
      <Divider dashed></Divider>
      <div className="conferences__list">
        <Row gutter={[24, 48]} style={{ width: '75%' }}>
          <Col span={12}>
            <ConferenceCard
              name="Testing Conference 1"
              thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
            />
          </Col>
          <Col span={12}>
            <TimeLine />
          </Col>
          <Col span={12}>
            <ConferenceCard
              name="Testing Conference 4"
              thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
            />
          </Col>
          <Col span={12}>
            <TimeLine />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConferencePage;
