import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = () => {
  return (
    <Upload>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default UploadFile;
