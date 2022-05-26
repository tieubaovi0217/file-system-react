import './styles.css';
import axios from 'axios';
import * as mime from 'mime-types';
import { useEffect, useState, useCallback } from 'react';

import useAxios from 'hooks/useAxios';
import FileBrowserContent from 'components/FileBrowser/FileBrowserContent';
import FileBrowserActions from 'components/FileBrowser/FileBrowserActions';
import FileBrowserHeader from 'components/FileBrowser/FileBrowserHeader';
import TreeView from 'components/FileBrowser/TreeView';

import { Layout, message } from 'antd';

import { SyncOutlined, GoogleOutlined } from '@ant-design/icons';
import { getUserFromLocalStorage } from 'common/localStorage';
import {
  buildPath,
  getRemotePath,
  normalizeURL,
  truncateFileName,
} from 'common/helpers';
import { useIsMounted } from 'hooks/useIsMounted';

const { Header, Sider, Content, Footer } = Layout;

const FileBrowserPage = () => {
  const { username } = getUserFromLocalStorage();

  const isMounted = useIsMounted();
  const [path, setPath] = useState('');
  const [toggleRefresh, setIsToggleRefresh] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(['/']);
  const [expandedKeys, setExpandedKeys] = useState(['/']);

  const {
    response: data,
    isLoading,
    isResolved,
    isRejected,
    fetchData,
  } = useAxios(process.env.REACT_APP_API_URL);

  useEffect(() => {
    const remotePath =
      path === 'google:drive'
        ? normalizeURL(`/google/files`)
        : getRemotePath(username, path);
    fetchData({
      path: remotePath,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, toggleRefresh]);

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
    if (isMounted.current) {
      handleSetPath(key);
      setSelectedKeys([key]);
      setExpandedKeys((prev) => {
        return [...prev, key];
      });
    }
  };

  const handleExpandTree = (key) => {
    if (isMounted.current) {
      setExpandedKeys(key);
    }
  };

  const handleBackButtonClick = () => {
    if (path.length > 0) {
      const updatedPath = path.substring(0, path.lastIndexOf('/'));

      handleSetPath(updatedPath);
      setSelectedKeys([updatedPath]);
      setExpandedKeys((prev) => {
        prev.pop();
        return prev;
      });
    }
  };

  const handleFolderDoubleClick = (name) => {
    const updatedPath = `${path}/${name}`;
    handleSelectTree(updatedPath);
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

  const handleSyncDriveFile = async (fileId) => {
    await axios.get(buildPath(`/google/${fileId}`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    message.success(`Downloaded`);
  };

  const handleDelete = async (name) => {
    try {
      const resp = await axios.post(
        buildPath('/resources/delete'),
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
    try {
      const resp = await axios.post(
        buildPath('/resources/mkdir'),
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
    } catch (err) {
      console.log(err);
      message.error('Create new folder failed');
    }
  };

  const handleRename = async (oldPath, newPath) => {
    try {
      const resp = await axios.put(
        buildPath('/resources/rename'),
        {
          oldPath,
          newPath,
          currentPath: path,
        },
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
    } catch (err) {
      console.log(err);
      message.error('Rename failed');
    }
  };

  const fetchTreeData = useCallback(
    async (path = '') => {
      const result = [];
      const resp = await axios.get(buildPath(getRemotePath(username, path)), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
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
    fetchTreeData().then((data) => {
      const treeData = [
        {
          title: 'Parent Directory',
          key: '/',
          type: 'directory',
          children: data,
        },
        {
          title: 'My Drive',
          key: 'google:drive',
          type: 'directory',
          children: [],
          icon: <GoogleOutlined />,
        },
      ];
      if (isMounted.current) {
        setTreeData(treeData);
      }
      return data;
    });
  }, [isMounted, toggleRefresh, fetchTreeData]);

  const handleSelectDrive = async () => {
    const key = 'google:drive';

    handleSetPath(key);
    setSelectedKeys([key]);
  };

  const handleGetURL = (fileName) => {
    let url;
    // attach type "Video" | "Document" | "Picture"
    const mimeType = mime.lookup(fileName);
    let notConvertedURL = normalizeURL(
      process.env.REACT_APP_API_URL +
        getRemotePath(username, `${path}/${fileName}`),
    );
    notConvertedURL = notConvertedURL.slice(0, -1);
    if (mimeType.startsWith('image')) {
      url = notConvertedURL + '?type=Picture';
    } else if (mimeType.startsWith('video')) {
      url = notConvertedURL + '?type=Video';
    } else {
      // temporarily
      url =
        normalizeURL(
          `${process.env.REACT_APP_API_URL}/cloudconvert/${path}/${fileName}`,
        ) + '?type=Document';
    }

    // attach token
    // url += `&token=${localStorage.getItem('token') || ''}`;

    console.log('url:', url);
    message.info('Copied to clipboard');
    navigator.clipboard.writeText(url);
    return url;
  };

  const isOnDrive = path === 'google:drive';

  return (
    <Layout
      className="file-browser"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px' }}
    >
      <Layout>
        <Sider width={320}>
          <TreeView
            treeData={treeData}
            selectedKeys={selectedKeys}
            expandedKeys={expandedKeys}
            onSelect={handleSelectTree}
            onExpand={handleExpandTree}
            onSelectDrive={handleSelectDrive}
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
                  onSyncDriveFile={handleSyncDriveFile}
                  onDelete={handleDelete}
                  onRename={handleRename}
                  onGetURL={handleGetURL}
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
          isOnDrive={isOnDrive}
        />
      </Footer>
    </Layout>
  );
};

export default FileBrowserPage;
