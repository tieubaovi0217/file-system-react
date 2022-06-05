import { Divider, Timeline } from 'antd';

import * as moment from 'moment';

const TimeLine = ({ timeline }) => {
  const timelineItems = timeline.map(({ content, time }, idx) => {
    return (
      <Timeline.Item key={idx} color={idx % 2 === 0 ? 'red' : 'blue'}>
        <span style={{ color: '#fff' }}>
          {moment(time).format('HH:mm - DD/MM/YYYY')}
        </span>
        <p>{content}</p>
      </Timeline.Item>
    );
  });

  return (
    <div>
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
            textAlign: 'left',
            marginLeft: '16px',
            textShadow: '1px 1px #ccc',
          }}
        >
          {timelineItems}
        </Timeline>
      </div>
    </div>
  );
};

export default TimeLine;
