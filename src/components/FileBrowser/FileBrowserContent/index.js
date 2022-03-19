import React, { useState } from 'react';

import { Row, Layout } from 'antd';

import File from '../File';
import Folder from '../Folder';

import FileBrowserHeader from '../FileBrowserHeader';
import { useDispatch } from 'react-redux';

import { fileBrowserActions } from '../../../slices/fileBrowser';

const { Header, Content } = Layout;

const FileBrowserContent = ({ items, path }) => {
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState('');

  const files = items
    .filter((item) => item.isFile && item.name.startsWith(filterValue.trim()))
    .map((file) => (
      <File path={path} key={`${file.relativePath}`} fileInfo={file} />
    ));

  const folders = items
    .filter(
      (item) =>
        item.isDirectDirectory && item.name.startsWith(filterValue.trim()),
    )
    .map((folder) => (
      <Folder path={path} key={`${folder.relativePath}`} folderInfo={folder} />
    ));

  const handleBackButtonClick = () => {
    if (path.length <= 1) return;
    dispatch(fileBrowserActions.popPath());
  };

  const handleSearchChange = (value) => {
    setFilterValue(value);
  };

  return (
    <Layout>
      <Header style={{ borderBottom: '0px' }}>
        <FileBrowserHeader
          currentPath={path}
          onSearchChange={handleSearchChange}
          onBackButtonClick={handleBackButtonClick}
        />
      </Header>
      <Content>
        <div className="file-browser__content">
          <Row gutter={[8, 8]}>
            {folders}
            {files}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default FileBrowserContent;
