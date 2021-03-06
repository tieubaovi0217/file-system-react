import './styles.css';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({ path, onSuccess, isOnDrive }) => {
  const props = {
    name: 'file',
    listType: 'text',
    onDownload: () => {
      console.log('downloading');
    },
    progress: {
      type: 'dashboard',
      strokeWidth: 2,
      showInfo: true,
      format: (percent) => `${parseFloat(percent).toFixed(0)}%`,
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
        message.success(`Tải lên file ${info.file.name} thành công!`, 1);
        onSuccess();
      } else if (info.file.status === 'error') {
        const status = info.file.error.status;
        if (status === 413) {
          return message.error(`File too large`); // file too large
        }
        message.error(
          `${info.file.name} file upload failed: ${info.file.response.error}`,
          1,
        );
      }
    },
  };

  const config = {
    disabled: isOnDrive,
  };

  return (
    <Upload {...props} className="file-browser__upload">
      <Button
        type="text"
        icon={<UploadOutlined className="font-125" />}
        {...config}
      >
        Tải lên
      </Button>
    </Upload>
  );
};

export default UploadFile;
