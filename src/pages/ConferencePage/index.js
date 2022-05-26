import './styles.css';

import { Col, Row } from 'antd';

import ConferenceCard from './ConferenceCard';

const thumbnailURLs = [
  'https://mootup.com/wp-content/uploads/2020/07/Zoom-webinar-3d-8.8-screens.png',
  'https://i.ytimg.com/vi/COEgicWT9XM/maxresdefault.jpg',
  'https://venturebeat.com/wp-content/uploads/2020/07/vFairs.jpg?resize=1024%2C590&strip=all',
  'https://eventsolutions.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-16-at-3.40.48-PM1-845x321.png',
];

const ConferencePage = () => {
  return (
    <div className="conferences">
      <h1 className="conference-heading">
        <span>CONFERENCES</span>
      </h1>
      {/* <Button
        type="primary"
        size={'large'}
        href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
        target={'_blank'}
      >
        Go to the conference
      </Button> */}
      <div className="conferences__list">
        <Row gutter={[24, 24]} style={{ width: '75%' }}>
          <Col span={8}>
            <ConferenceCard
              name="Testing Conference 1"
              thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
            />
          </Col>
          <Col span={8}>
            <ConferenceCard
              name="Testing Conference 2"
              thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
            />
          </Col>
          <Col span={8}>
            <ConferenceCard
              name="Testing Conference 3"
              thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
            />
          </Col>
          <Col span={8}>
            <ConferenceCard
              name="Testing Conference 4"
              thumbnailUrl={thumbnailURLs[Math.floor(Math.random() * 4)]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConferencePage;
