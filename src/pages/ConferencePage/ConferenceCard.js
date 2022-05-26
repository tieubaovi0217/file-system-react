import { Card, Image, Button, Divider } from 'antd';

const ConferenceCard = ({ name, thumbnailUrl }) => {
  return (
    <div className="">
      <Card
        title={name}
        style={{
          height: '360px',
          border: '1px solid #c7c7c7',
          borderRadius: '16px',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
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
        <Divider />
        <div className="flex justify-content-center conference__actions">
          <Button
            type="primary"
            href={process.env.REACT_APP_EDITOR_PAGE_URL}
            target={'_blank'}
            style={{
              marginRight: '24px',
              boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
            target={'_blank'}
            style={{
              boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
            }}
          >
            Click to join!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConferenceCard;
