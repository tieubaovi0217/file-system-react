import { useEffect, useState } from 'react';
import { Button } from 'antd';

import { SyncOutlined, GoogleOutlined } from '@ant-design/icons';

import UploadFile from './UploadFile';
import UploadFolder from './UploadFolder';
import { axiosInstance } from 'common/axios';

const FileBrowserActions = ({ onRefresh, path, onCreateFolder }) => {
  const [oauth2URL, setOauth2URL] = useState('');

  useEffect(() => {
    const getOAuth2URL = async () => {
      const resp = await axiosInstance.get('/google/oauth2url');
      const { url } = resp.data;
      console.log('oauth2 url:', url);
      setOauth2URL(url);
    };

    getOAuth2URL();
  }, []);

  return (
    <div className="file-browser__actions">
      <Button type="text" icon={<GoogleOutlined />} href={oauth2URL}>
        Sync with Google
      </Button>
      <UploadFolder onCreateFolder={onCreateFolder} onSuccess={onRefresh} />
      <UploadFile path={path} onSuccess={onRefresh} />
      <Button type="text" icon={<SyncOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
};

export default FileBrowserActions;
