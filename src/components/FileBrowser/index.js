import './index.css';

import FileBrowserContent from './FileBrowserContent';
import FileBrowserActions from './FileBrowserActions';

import { Layout, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFileBrowserDataAsync } from '../../actions/fileBrowser';

import { SyncOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const FileBrowser = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const data = useSelector((state) => state.fileBrowser.data);
  const path = useSelector((state) => state.fileBrowser.path);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    dispatch(fetchFileBrowserDataAsync(path))
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      })
      .finally(() => isMounted && setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, [dispatch, path, isRefreshing]);

  const refreshHandler = () => {
    setIsRefreshing((prevState) => !prevState);
  };

  return (
    <Layout className="file-browser">
      <Header>
        <FileBrowserActions onRefresh={refreshHandler} path={path} />
      </Header>
      <Layout>
        <Sider style={{ borderRight: '1px solid #d7d7d7' }}>Tree view</Sider>
        <Content>
          {isLoading && (
            <div className="file-browser__spinner">
              <SyncOutlined spin />
            </div>
          )}
          {!isLoading && <FileBrowserContent path={path} items={data} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default FileBrowser;
