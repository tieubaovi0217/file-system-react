import BannerAnim, { Element } from 'rc-banner-anim';
import './styles.css';
import TweenOne from 'rc-tween-one';

const StartingPageContent = () => {
  return (
    <section className="starting">
      <h1 className="heading">
        <span id="banner">
          <BannerAnim prefixCls="banner-user">
            <Element prefixCls="banner-user-elem" key="0">
              <TweenOne
                className="banner-user-title"
                style={{ letterSpacing: '2px' }}
                animation={{ y: 30, opacity: 0, type: 'from' }}
              >
                Chào mừng bạn đến với nền tảng hội nghị ảo
              </TweenOne>
              <TweenOne
                className="banner-user-text"
                style={{ fontSize: '28px', letterSpacing: '4px' }}
                animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
                Nơi nhanh nhất cho bạn tự tạo các cuộc hội nghị ảo trực tuyến
              </TweenOne>
            </Element>
          </BannerAnim>
        </span>
      </h1>
    </section>
  );
};

export default StartingPageContent;
