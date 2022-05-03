import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import UploadFile from './UploadFile';
import UploadFolder from './UploadFolder';

const FileBrowserActions = ({ onRefresh, path, onCreateFolder }) => {
  return (
    <div className="file-browser__actions">
      <UploadFolder onCreateFolder={onCreateFolder} onSuccess={onRefresh} />
      <UploadFile path={path} onSuccess={onRefresh} />
      <Button type="text" icon={<SyncOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
};

export default FileBrowserActions;
