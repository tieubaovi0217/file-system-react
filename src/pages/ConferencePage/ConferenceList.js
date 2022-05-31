import { Row, Col } from 'antd';

import TimeLine from './TimeLine';
import ConferenceCard from './ConferenceCard';

const thumbnailURLs = [
  'https://mootup.com/wp-content/uploads/2020/07/Zoom-webinar-3d-8.8-screens.png',
  'https://i.ytimg.com/vi/COEgicWT9XM/maxresdefault.jpg',
  'https://venturebeat.com/wp-content/uploads/2020/07/vFairs.jpg?resize=1024%2C590&strip=all',
  'https://eventsolutions.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-16-at-3.40.48-PM1-845x321.png',
];

const ConferenceList = ({ conferences, onRefresh }) => {
  const cards = conferences.map(
    ({ name, _id, startTime, endTime, editors, timeline }) => {
      return (
        <Col key={_id} span={24} style={{ display: 'flex' }}>
          <ConferenceCard
            onRefresh={onRefresh}
            key={_id}
            name={name}
            id={_id}
            startTime={startTime}
            endTime={endTime}
            editors={editors}
            timeline={timeline}
            thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
          />
          <TimeLine timeline={timeline} />
        </Col>
      );
    },
  );

  return (
    <div className="conferences__list">
      <Row gutter={[24, 24]} style={{ width: '75%' }}>
        {cards}
      </Row>
    </div>
  );
};

export default ConferenceList;
