import Navigation from './Navigation';

const Layout = (props) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
