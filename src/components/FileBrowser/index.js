import './index.css';
import { useEffect } from 'react';

import { Divider } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import FileBrowserHeader from './FileBrowserHeader';
import FileBrowserContent from './FileBrowserContent';
import FileBrowserFooter from './FileBrowserFooter';

import { fetchFileBrowserData } from '../../store/fileBrowserActions';
import { useDispatch, useSelector } from 'react-redux';

const ROOT_URL = `${process.env.REACT_APP_RESOURCES_ROOT_FOLDER_PATH}`;

const FileBrowser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fileBrowser.data);
  const isLoading = useSelector((state) => state.fileBrowser.isLoading);

  useEffect(() => {
    dispatch(fetchFileBrowserData(ROOT_URL));
  }, [dispatch]);

  return (
    <section className="file-browser">
      {isLoading && (
        <div className="file-browser__spinner">
          <SyncOutlined style={{ fontSize: '40px' }} spin />
        </div>
      )}
      {!isLoading && (
        <>
          <FileBrowserHeader />
          <Divider />
          <FileBrowserContent items={data} />
          <Divider />
          <FileBrowserFooter />
        </>
      )}
    </section>
  );
};

export default FileBrowser;
