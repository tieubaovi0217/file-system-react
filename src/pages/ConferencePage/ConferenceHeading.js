import TweenOne from 'rc-tween-one';

const ConferenceHeading = () => {
  return (
    <h1 className="conference__heading">
      <span>
        <TweenOne
          className="banner-user-title"
          style={{ letterSpacing: '4px' }}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          CONFERENCES
        </TweenOne>
      </span>
    </h1>
  );
};

export default ConferenceHeading;
