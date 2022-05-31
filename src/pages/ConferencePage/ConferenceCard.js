import { Card, Divider, message } from 'antd';

import CardImage from './CardImage';
import CardActions from './CardActions';

const ConferenceCard = ({
  id,
  name,
  thumbnailUrl,
  startTime,
  endTime,
  editors,
}) => {
  const handleGetConferenceID = () => {
    console.log(id);
    message.info('Copied Conference ID to clipboard');
    navigator.clipboard.writeText(id);
  };

  return (
    <Card
      title={name}
      style={{
        width: '50%',
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
      <CardActions
        onGetConferenceID={handleGetConferenceID}
        conference={{ id, name, thumbnailUrl, startTime, endTime, editors }}
      />
    </Card>
  );
};

export default ConferenceCard;
