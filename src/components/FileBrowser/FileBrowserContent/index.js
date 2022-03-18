import React from 'react';

import { Row, Layout } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import File from '../File';
import Folder from '../Folder';

import FileBrowserHeader from '../FileBrowserHeader';

const { Header, Content } = Layout;

const FileBrowserContent = ({ data, loading, path }) => {
  const files = data
    .filter((item) => item.isFile)
    .map((file) => (
      <File path={path} key={`${file.relativePath}`} fileInfo={file} />
    ));

  const folders = data
    .filter((item) => item.isDirectDirectory)
    .map((folder) => (
      <Folder path={path} key={`${folder.relativePath}`} folderInfo={folder} />
    ));

  return (
    <Layout>
      <Header style={{ borderBottom: '0px' }}>
        <FileBrowserHeader currentPath={path} />
      </Header>
      <Content>
        <div className="file-browser__content">
          {loading && (
            <div className="file-browser__spinner">
              <SyncOutlined spin />
            </div>
          )}
          {!loading && (
            <Row gutter={[8, 8]}>
              {folders}
              {files}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default FileBrowserContent;
