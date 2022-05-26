import { Card, Image, Button, Divider } from 'antd';

const ConferenceCard = ({ name, thumbnailUrl }) => {
  return (
    <Card
      title={name}
      style={{
        height: '320px',
        border: '1px solid #c7c7c7',
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '180px',
        }}
        src={thumbnailUrl}
        alt="Conference Preview"
      />
      <div className="flex justify-content-center conference__actions">
        <Button
          type="primary"
          style={{ marginRight: '16px' }}
          href={process.env.REACT_APP_EDITOR_PAGE_URL}
          target={'_blank'}
        >
          Edit
        </Button>
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
