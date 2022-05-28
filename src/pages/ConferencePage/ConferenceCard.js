import { Card, Divider, message } from 'antd';

import CardImage from './CardImage';
import CardActions from './CardActions';

const ConferenceCard = ({ id, name, thumbnailUrl, startTime, endTime }) => {
  const handleGetConferenceID = () => {
    console.log(id);
    message.info('Copied Conference ID to clipboard');
    navigator.clipboard.writeText(id);
  };

  return (
    <div>
      <Card
        title={name}
        style={{
          height: '420px',
          border: '1px solid #c7c7c7',
          borderRadius: '16px',
          opacity: '0.8',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        }}
      >
        <CardImage
          thumbnailUrl={thumbnailUrl}
          startTime={startTime}
          endTime={endTime}
        />

        <Divider />
        <CardActions onGetConferenceID={handleGetConferenceID} />
      </Card>
    </div>
  );
};

export default ConferenceCard;
