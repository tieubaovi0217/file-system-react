import './index.css';

import FileBrowserContent from './FileBrowserContent';
import FileBrowserActions from './FileBrowserActions';

import { Layout, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFileBrowserDataAsync } from '../../actions/fileBrowser';

const { Header, Sider, Content } = Layout;

const FileBrowser = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const filteredData = useSelector((state) => state.fileBrowser.filteredData);
  const path = useSelector((state) => state.fileBrowser.path);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFileBrowserDataAsync(path))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message, 0.5);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, path]);

  const refreshHandler = () => {
    message.loading('Syncing...', 10);
    //
    setIsLoading(true);
    setTimeout(() => {
      dispatch(fetchFileBrowserDataAsync(path))
        .then((res) => {
          console.log(res);
          message.destroy();
          message.success('Synced', 0.5);
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message, 0.5);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000); // simulate 1s :))
  };

  return (
    <Layout className="file-browser">
      <Header>
        <FileBrowserActions onRefresh={refreshHandler} path={path} />
      </Header>
      <Layout>
        <Sider style={{ borderRight: '1px solid #d7d7d7' }}>Tree view</Sider>
        <Content>
          <FileBrowserContent
            path={path}
            data={filteredData}
            loading={isLoading}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default FileBrowser;
