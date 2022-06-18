import { Card, Divider, message } from 'antd';

import CardImage from './CardImage';
import CardActions from './CardActions';

const ConferenceCard = ({
  id,
  name,
  thumbnailUrl,
  startTime,
  endTime,
  timeline,
  onRefresh,
  owner,
}) => {
  const handleGetConferenceID = () => {
    console.log(id);
    message.info('Copied Conference ID to clipboard');
    navigator.clipboard.writeText(id);
  };

  return (
    <Card
      className="conference__card"
      title={<h2 className="conference__name">{name}</h2>}
    >
      <CardImage
        thumbnailUrl={thumbnailUrl}
        startTime={startTime}
        endTime={endTime}
      />

      <Divider />
      <CardActions
        owner={owner}
        onGetConferenceID={handleGetConferenceID}
        onRefresh={onRefresh}
        conference={{
          id,
          name,
          thumbnailUrl,
          startTime,
          endTime,
          timeline,
        }}
      />
    </Card>
  );
};

export default ConferenceCard;
