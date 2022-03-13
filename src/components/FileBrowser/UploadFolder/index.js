import { Upload, Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const UploadFolder = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Upload>
      <Button disabled={!isAuthenticated} icon={<CloudUploadOutlined />}>
        Upload folder
      </Button>
    </Upload>
  );
};

export default UploadFolder;
