import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFolder = () => {
  return (
    <Upload>
      <Button icon={<UploadOutlined />}>Upload Folder</Button>
    </Upload>
  );
};

export default UploadFolder;
