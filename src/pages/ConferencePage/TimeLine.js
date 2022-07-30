import { Divider, Timeline } from 'antd';

import * as moment from 'moment';

const TimeLine = ({ timeline }) => {
  const timelineItems = timeline.map(({ content, time }, idx) => {
    return (
      <Timeline.Item key={idx} color={idx % 2 === 0 ? 'red' : 'blue'}>
        <span style={{ color: '#fff' }}>
          {`Thời gian: ${moment(time).format('HH:mm - DD/MM/YYYY')}`}
        </span>
        <p>{content}</p>
      </Timeline.Item>
    );
  });

  return (
    <div className="timeline">
      <Divider
        type="horizontal"
        dashed
        style={{
          letterSpacing: '4px',
          color: '#f6f6f6',
          fontSize: '32px',
          textShadow:
            '0 2px 1px #747474, -1px 3px 1px #767676, -2px 5px 1px #787878, -3px 7px 1px #7a7a7a,-4px 9px 1px #7f7f7f,-5px 11px 1px #838383,-6px 13px 1px #878787,-7px 15px 1px #8a8a8a, -8px 17px 1px #8e8e8e',
        }}
      >
        Lịch trình
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
