import { Divider, Timeline } from 'antd';

import * as moment from 'moment';

const TimeLine = ({ timeline }) => {
  const timelineItems = timeline.map(({ content, time }, idx) => {
    return (
      <Timeline.Item key={idx} color={idx % 2 === 0 ? 'red' : 'blue'}>
        {moment(time).format('HH:mm - DD/MM/YYYY')}: {content}
      </Timeline.Item>
    );
  });

  return (
    <div style={{ width: '50%' }}>
      <Divider
        type="horizontal"
        dashed
        style={{ letterSpacing: '4px', color: '#f6f6f6', fontSize: '24px' }}
      >
        Timeline
      </Divider>
      <div>
        <Timeline
          style={{
            marginTop: '24px',
            marginLeft: '24px',
            textShadow: '2px 2px #ccc',
          }}
        >
          {timelineItems}
        </Timeline>
      </div>
    </div>
  );
};

export default TimeLine;
