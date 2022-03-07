import Navigation from './Navigation';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
