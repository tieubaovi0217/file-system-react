import './styles.css';

import { Button, Card, Col, Row } from 'antd';

import ConferenceCard from './ConferenceCard';

const ConferencePage = () => {
  return (
    <div className="conferences">
      <h1 className="heading">Conference Page</h1>
      <Button
        type="primary"
        size={'large'}
        href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
        target={'_blank'}
      >
        Go to the conference
      </Button>
      <div className="conferences__list">
        <Row gutter={[16, 16]} style={{ width: '70%' }}>
          <Col span={8}>
            <ConferenceCard
              name="Testing Conference 1"
              thumbnailUrl="https://mootup.com/wp-content/uploads/2020/07/Zoom-webinar-3d-8.8-screens.png"
            />
          </Col>
          <Col span={8}>
            <ConferenceCard name="Testing Conference 2" />
          </Col>
          <Col span={8}>
            <ConferenceCard name="Testing Conference 3" />
          </Col>
          <Col span={8}>
            <ConferenceCard name="Testing Conference 4" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConferencePage;
