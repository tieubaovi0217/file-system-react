import React, { useState } from 'react';

import { Row, Layout, message } from 'antd';

import File from '../File';
import Folder from '../Folder';

import FileBrowserHeader from '../FileBrowserHeader';
import { useDispatch } from 'react-redux';

import { fileBrowserActions } from '../../../slices/fileBrowser';
import { fetchFileBrowserDataAsync } from '../../../actions/fileBrowser';

import { normalizeRelativePath } from '../../../helpers';

const { Header, Content } = Layout;

const FileBrowserContent = ({ items, path }) => {
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState('');

  const handleDeleteFileOrFolder = async (relativePath, name) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/root/delete/${normalizeRelativePath(
        relativePath,
      )}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem('token') ? localStorage.getItem('token') : ''
          }`,
        },
      },
    );
    if (!res.ok) {
      const { error } = await res.json();
      return message.error(error);
    }

    dispatch(fetchFileBrowserDataAsync(path))
      .then(() => message.success(`Delete file ${name} successfully`))
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
  };

  const handleBackButtonClick = () => {
    if (path.length <= 0) return;
    dispatch(fileBrowserActions.popPath());
  };

  const handleSearchChange = (value) => {
    setFilterValue(value);
  };

  const handleFolderDoubleClick = (name) => {
    const updatedPath = path === '' ? name : `${path}/${name}`;
    console.log(updatedPath);
    dispatch(fetchFileBrowserDataAsync(updatedPath));
  };

  const files = items
    .filter((item) => item.isFile && item.name.startsWith(filterValue.trim()))
    .map((file) => (
      <File
        key={`${file.relativePath}`}
        fileInfo={file}
        onDelete={handleDeleteFileOrFolder}
      />
    ));

  const folders = items
    .filter(
      (item) =>
        item.isDirectDirectory && item.name.startsWith(filterValue.trim()),
    )
    .map((folder) => (
      <Folder
        path={path}
        key={`${folder.relativePath}`}
        folderInfo={folder}
        onDelete={handleDeleteFileOrFolder}
        onDoubleClick={handleFolderDoubleClick}
      />
    ));

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