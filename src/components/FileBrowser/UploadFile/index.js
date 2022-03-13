import { Upload, Button, message } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const UploadFile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //TODO: fix issue long file name
  const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:5000/upload',
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Upload {...props}>
        <Button disabled={!isAuthenticated} icon={<CloudUploadOutlined />}>
          Upload files
        </Button>
      </Upload>
    </div>
  );
};

export default UploadFile;
