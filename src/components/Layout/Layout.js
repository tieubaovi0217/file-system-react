import './index.css';
import Navigation from './Navigation';

const Layout = (props) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <div className="main">{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
