import { Upload, Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const UploadFile = () => {
  return (
    <Upload>
      <Button icon={<CloudUploadOutlined />}>Upload file</Button>
    </Upload>
  );
};

export default UploadFile;
