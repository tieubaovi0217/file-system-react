import './styles.css';

import { Button } from 'antd';

const ConferencePage = () => {
  return (
    <section className="conference">
      <h1 className="heading">Conference Page</h1>
      <Button
        type="primary"
        size={'large'}
        href={process.env.REACT_APP_CONFERENCE_PAGE_URL}
        target={'_blank'}
      >
        Go to the conference
      </Button>
    </section>
  );
};

export default ConferencePage;
