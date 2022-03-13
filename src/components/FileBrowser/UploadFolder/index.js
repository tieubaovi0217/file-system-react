import { Upload, Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const UploadFolder = () => {
  return (
    <Upload>
      <Button icon={<CloudUploadOutlined />}>Upload folder</Button>
    </Upload>
  );
};

export default UploadFolder;
