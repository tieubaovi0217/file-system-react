import { useEffect, useState } from 'react';
import { Button } from 'antd';

import { SyncOutlined, GoogleOutlined } from '@ant-design/icons';

import UploadFile from './UploadFile';
import UploadFolder from './UploadFolder';
import { useIsMounted } from 'hooks/useIsMounted';
import axios from 'axios';
import { buildPath } from 'common/helpers';

const FileBrowserActions = ({ onRefresh, path, onCreateFolder, isOnDrive }) => {
  const [oauth2URL, setOauth2URL] = useState('');
  const isMounted = useIsMounted();

  useEffect(() => {
    const getOAuth2URL = async () => {
      const resp = await axios.get(buildPath('/google/oauth2url'), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      const { url } = resp.data;
      if (isMounted.current) {
        setOauth2URL(url);
      }
    };

    getOAuth2URL();
  }, [isMounted]);

  return (
    <div className="file-browser__actions">
      <Button type="text" icon={<GoogleOutlined />} href={oauth2URL}>
        Mirror from Google account
      </Button>
      <UploadFolder
        isOnDrive={isOnDrive}
        onCreateFolder={onCreateFolder}
        onSuccess={onRefresh}
      />
      <UploadFile isOnDrive={isOnDrive} path={path} onSuccess={onRefresh} />
      <Button type="text" icon={<SyncOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
};

export default FileBrowserActions;
