import { Card, Image, Button } from 'antd';

const ConferenceCard = ({ name, thumbnailUrl }) => {
  return (
    <Card
      title={name}
      style={{
        height: '300px',
        border: '1px solid #c7c7c7',
        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Image
        style={{ width: '100%' }}
        src={thumbnailUrl}
        alt="Conference Preview"
      />
      <div>
        <Button type="primary">Edit</Button>
        <Button
          type="primary"
          href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
          target={'_blank'}
        >
          Click to join!
        </Button>
      </div>
    </Card>
  );
};

export default ConferenceCard;
