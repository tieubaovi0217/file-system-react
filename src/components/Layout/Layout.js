import Navigation from './Navigation';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <div className={classes.main}>{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
