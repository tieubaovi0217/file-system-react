import axios from 'axios';
import React, { useState } from 'react';

import { Row, Layout, message } from 'antd';

import File from '../File';
import Folder from '../Folder';

import FileBrowserHeader from '../FileBrowserHeader';
import { useDispatch } from 'react-redux';

import { fileBrowserActions } from 'slices/fileBrowser';
import { fetchFileBrowserDataThunk } from 'actions/fileBrowser';

import { normalizeRelativePath } from 'common/helpers';
import { getUserFromLocalStorage } from 'common/localStorage';

const { Header, Content } = Layout;

const FileBrowserContent = ({ items, path }) => {
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState('');

  const handleDeleteFileOrFolder = async (relativePath, name) => {
    console.log(normalizeRelativePath(relativePath));
    const res = await fetch(`${process.env.REACT_APP_API_URL}/root/delete/`, {
      method: 'POST',
      body: JSON.stringify({ path: normalizeRelativePath(relativePath) }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    if (!res.ok) {
      const { error } = await res.json();
      return message.error(error);
    }

    dispatch(fetchFileBrowserDataThunk(path))
      .then(() => message.success(`Delete ${name} successfully`))
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
    // const updatedPath = path === '' ? name : `${path}/${name}`;
    // console.log(updatedPath);
    dispatch(fetchFileBrowserDataThunk(`${path}/${name}`));
  };

  const handleDownload = async (name) => {
    const { username } = getUserFromLocalStorage();
    // const resp = await axios.get(
    //   `${process.env.REACT_APP_WEB_SERVER_URL}/root/${user.username}`,
    // );
  };

  const files = items
    .filter(
      (item) =>
        item.type === 'file' && item.name.startsWith(filterValue.trim()),
    )
    .map((file) => (
      <File
        key={file.name}
        name={file.name}
        mtime={file.mtime}
        size={file.size}
        onDelete={handleDeleteFileOrFolder}
        onDownload={handleDownload}
      />
    ));

  const folders = items
    .filter(
      (item) =>
        item.type === 'directory' && item.name.startsWith(filterValue.trim()),
    )
    .map((folder) => (
      <Folder
        path={path}
        key={folder.name}
        mtime={folder.mtime}
        name={folder.name}
        size={folder.size}
        onDelete={handleDeleteFileOrFolder}
        onDoubleClick={handleFolderDoubleClick}
        onDownload={handleDownload}
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
