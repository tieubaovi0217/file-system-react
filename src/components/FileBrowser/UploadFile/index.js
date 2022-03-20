import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({ path, onSuccess }) => {
  const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: `${process.env.REACT_APP_API_URL}/upload`,
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }`,
    },
    data: {
      path,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        onSuccess();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button
        type="text"
        icon={<UploadOutlined style={{ fontSize: '125%' }} />}
      >
        Upload
      </Button>
    </Upload>
  );
};

export default UploadFile;