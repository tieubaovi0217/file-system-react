import './FileBrowserPage.css';
import React, { useEffect, useState } from 'react';

import useAxios from 'hooks/useAxios';
import FileBrowserContent from 'components/FileBrowser/FileBrowserContent';
import FileBrowserActions from 'components/FileBrowser/FileBrowserActions';
import FileBrowserHeader from 'components/FileBrowser/FileBrowserHeader';

import { Layout, message } from 'antd';

import { SyncOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const FileBrowserPage = () => {
  const username = 'admin';
  const [path, setPath] = useState('');
  const [toggleRefresh, setIsToggleRefresh] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const {
    response: data,
    isLoading,
    isResolved,
    isRejected,
    fetchData,
  } = useAxios();

  useEffect(() => {
    fetchData({
      url: `${process.env.REACT_APP_WEB_SERVER_URL}/root/${username}${path}`,
      method: 'get',
      headers: JSON.stringify({
        'Content-Type': 'application/json',
      }),
    });
  }, [path, fetchData, toggleRefresh]);

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

  if (isRejected) {
  }

  if (isResolved) {
  }

  return (
    <Layout className="file-browser">
      <Header>
        <FileBrowserActions onRefresh={handleRefresh} path={path} />
      </Header>
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
                />
              )}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FileBrowserPage;
