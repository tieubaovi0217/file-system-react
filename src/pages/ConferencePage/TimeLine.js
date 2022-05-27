import { Divider, Timeline } from 'antd';

const TimeLine = () => {
  return (
    <div>
      <Divider
        type="horizontal"
        dashed
        style={{ letterSpacing: '4px', color: '#f6f6f6' }}
      >
        Timeline
      </Divider>
      <div>
        <Timeline
          style={{
            marginTop: '24px',
            textShadow: '2px 2px #ccc',
          }}
        >
          <Timeline.Item color="red">
            Create a services site 2015-09-01
          </Timeline.Item>
          <Timeline.Item>
            Solve initial network problems 2015-09-01
          </Timeline.Item>
          <Timeline.Item color="red">
            Technical testing 2015-09-01
          </Timeline.Item>
          <Timeline.Item>
            Network problems being solved 2015-09-01
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default TimeLine;
