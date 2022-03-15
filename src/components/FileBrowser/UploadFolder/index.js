import { Upload, Button } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';

const UploadFolder = () => {
  return (
    <Upload>
      <Button
        type="text"
        icon={<FolderAddOutlined style={{ fontSize: '125%' }} />}
      >
        New folder
      </Button>
    </Upload>
  );
};

export default UploadFolder;
