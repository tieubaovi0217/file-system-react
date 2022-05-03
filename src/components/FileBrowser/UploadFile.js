import './styles.css';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({ path, onSuccess }) => {
  const props = {
    name: 'file',
    listType: 'text',
    onDownload: () => {
      console.log('downloading');
    },
    multiple: true,
    // showUploadList: false,
    action: `${process.env.REACT_APP_API_URL}/upload`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    data: {
      destination: path,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        onSuccess();
      } else if (info.file.status === 'error') {
        const status = info.file.error.status;
        if (status === 413) {
          return message.error(`File too large`); // file too large
        }
        message.error(
          `${info.file.name} file upload failed: ${info.file.response.message}`,
        );
      }
    },
  };

  return (
    <Upload {...props} className="file-browser__upload">
      <Button type="text" icon={<UploadOutlined className="font-125" />}>
        Upload
      </Button>
    </Upload>
  );
};

export default UploadFile;
