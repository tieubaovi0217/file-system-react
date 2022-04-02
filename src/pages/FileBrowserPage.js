import './FileBrowserPage.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useAxios from 'hooks/useAxios';
import FileBrowserContent from 'components/FileBrowser/FileBrowserContent';
import FileBrowserActions from 'components/FileBrowser/FileBrowserActions';
import FileBrowserHeader from 'components/FileBrowser/FileBrowserHeader';

import { Layout, message } from 'antd';

import { SyncOutlined } from '@ant-design/icons';
import { getUserFromLocalStorage } from 'common/localStorage';
import { normalizeURL } from 'common/helpers';

const { Header, Sider, Content, Footer } = Layout;

const FileBrowserPage = () => {
  const { username } = getUserFromLocalStorage();
  const [path, setPath] = useState('');
  const [toggleRefresh, setIsToggleRefresh] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const {
    response: data,
    isLoading,
    isResolved,
    isRejected,
    fetchData,
  } = useAxios(process.env.REACT_APP_API_URL);

  useEffect(() => {
    if (!username) return;
    fetchData({
      path: normalizeURL(`/root/${username}/${path}`),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  }, [path, fetchData, toggleRefresh, username]);

  const handleRefresh = () => {
    setIsToggleRefresh((prevState) => !prevState);
  };

  const handleSearchChange = (value) => {
    setFilterValue(value);
  };

  const handleBackButtonClick = () => {
    if (path.length > 0) {
      const updatedPath = path.substring(0, path.lastIndexOf('/'));
      setPath(updatedPath);
    }
  };

  const handleFolderDoubleClick = (name) => {
    setPath((prevPath) => `${prevPath}/${name}`);
  };

  const handleDownload = async (name) => {
    const url = normalizeURL(
      `${process.env.REACT_APP_API_URL}/root/${username}/${path}/${name}`,
    );
    axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleDelete = async (name) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/resources/delete`,
        {
          path: `${path}/${name}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      console.log(resp);
      message.success(`Delete ${name} successfully`);
      handleRefresh();
    } catch (error) {
      console.log(error);
      message.error('Cannot delete file, server error');
    }
  };

  const handleCreateNewFolder = async (name) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/resources/mkdir`,
      { destination: path, newFolderName: name },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      },
    );
    console.log(resp);
    handleRefresh();
  };

  return (
    <Layout className="file-browser">
      <Layout>
        <Sider style={{ borderRight: '1px solid #d7d7d7' }}>Tree view</Sider>
        <Content>
          <Layout>
            <Header style={{ borderBottom: '0px' }}>
              <FileBrowserHeader
                currentPath={path}
                onSearchChange={handleSearchChange}
                onBackButtonClick={handleBackButtonClick}
              />
            </Header>
            <Content>
              {isRejected && <p>Loading failed...</p>}
              {isLoading && (
                <div className="file-browser__spinner">
                  <SyncOutlined spin />
                </div>
              )}
              {isResolved && (
                <FileBrowserContent
                  path={path}
                  items={data.filter((item) =>
                    item.name.startsWith(filterValue),
                  )}
                  onFolderDoubleClick={handleFolderDoubleClick}
                  onDownload={handleDownload}
                  onDelete={handleDelete}
                />
              )}
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer style={{ borderTop: '1px solid #d7d7d7' }}>
        <FileBrowserActions
          onCreateFolder={handleCreateNewFolder}
          onRefresh={handleRefresh}
          path={path}
        />
      </Footer>
    </Layout>
  );
};

export default FileBrowserPage;
