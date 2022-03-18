import './index.css';
import { Divider } from 'antd';

import FileBrowserHeader from './FileBrowserHeader';
import FileBrowserContent from './FileBrowserContent';
import FileBrowserActions from './FileBrowserActions';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const FileBrowser = () => {
  return (
    <Layout className="file-browser">
      <Header>
        <FileBrowserActions />
      </Header>
      <Layout>
        <Sider style={{ borderRight: '1px solid #d7d7d7' }}>Tree view</Sider>
        <Layout>
          <Header style={{ borderBottom: '0px' }}>
            <FileBrowserHeader />
          </Header>
          <Content>
            <FileBrowserContent />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FileBrowser;
