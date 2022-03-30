import React from 'react';

import UploadFile from './UploadFile';
import UploadFolder from './UploadFolder';

import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const FileBrowserActions = ({ onRefresh, path }) => {
  return (
    <div className="file-browser__actions">
      <UploadFolder path={path} onSuccess={onRefresh} />
      <UploadFile path={path} onSuccess={onRefresh} />
      <Button type="text" icon={<SyncOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
};

export default FileBrowserActions;
