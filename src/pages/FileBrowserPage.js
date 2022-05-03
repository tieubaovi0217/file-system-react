import './FileBrowserPage.css';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

import useAxios from 'hooks/useAxios';
import FileBrowserContent from 'components/FileBrowser/FileBrowserContent';
import FileBrowserActions from 'components/FileBrowser/FileBrowserActions';
import FileBrowserHeader from 'components/FileBrowser/FileBrowserHeader';
import TreeView from 'components/FileBrowser/TreeView';

import { Layout, message } from 'antd';

import { SyncOutlined } from '@ant-design/icons';
import { getUserFromLocalStorage } from 'common/localStorage';
import { getRemotePath, normalizeURL, truncateFileName } from 'common/helpers';

const { Header, Sider, Content, Footer } = Layout;

const FileBrowserPage = () => {
  const { username } = getUserFromLocalStorage();
  const [path, setPath] = useState('');
  const [toggleRefresh, setIsToggleRefresh] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

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
      path: getRemotePath(username, path),
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

  const handleSetPath = (newPath) => {
    sessionStorage.setItem('path', newPath);
    setPath(newPath);
  };

  const handleSelectTree = (key) => {
    handleSetPath(key);
    setSelectedKeys([key]);
  };

  const handleBackButtonClick = () => {
    if (path.length > 0) {
      const updatedPath = path.substring(0, path.lastIndexOf('/'));
      handleSetPath(updatedPath);
      handleSelectTree(updatedPath);
    }
  };

  const handleFolderDoubleClick = (name) => {
    handleSetPath(`${path}/${name}`);
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
      message.error('Cannot delete file or folder, server error');
    }
  };

  const handleCreateNewFolder = async (name) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/resources/mkdir`,
      { destination: path, newFolderName: name },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      },
    );
    console.log(resp);
    handleRefresh();
  };

  const handleRename = async (oldPath, newPath) => {
    const resp = await axios.put(
      `${process.env.REACT_APP_API_URL}/resources/rename`,
      { oldPath, newPath },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      },
    );
    console.log(resp);
    message.success('Rename successfully');
    handleRefresh();
  };

  const fetchTreeData = useCallback(
    async (path = '') => {
      const result = [];
      const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      const resp = await axiosInstance.get(getRemotePath(username, path));
      for (const resource of resp.data) {
        resource.isLeaf = true;
        resource.title = truncateFileName(resource.name);
        resource.key = normalizeURL(`${path}/${resource.name}`);
        if (resource.type === 'directory') {
          resource.isLeaf = false;
          resource.children = await fetchTreeData(`${path}/${resource.name}`);
        }
        result.push(resource);
      }
      return result;
    },
    [username],
  );

  useEffect(() => {
    const getTreeData = async () => {
      const treeData = await fetchTreeData();
      return treeData;
    };

    getTreeData().then((data) => {
      const treeData = [
        {
          title: 'Parent Directory',
          key: '/',
          type: 'directory',
          children: data,
        },
      ];
      setTreeData(treeData);
    });
  }, [toggleRefresh, fetchTreeData]);

  return (
    <Layout className="file-browser">
      <Layout>
        <Sider width={360}>
          <TreeView
            treeData={treeData}
            onSelect={handleSelectTree}
            selectedKeys={selectedKeys}
          />
        </Sider>
        <Content>
          <Layout>
            <Header id="file-browser__header">
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
                  onRename={handleRename}
                />
              )}
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer>
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
