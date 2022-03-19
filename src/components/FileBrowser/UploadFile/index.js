import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { fetchFileBrowserDataAsync } from '../../../actions/fileBrowser';

const UploadFile = ({ path }) => {
  const dispatch = useDispatch();

  const props = {
    name: 'file',
    multiple: true,
    action: `${process.env.REACT_APP_API_URL}/upload`,
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }`,
    },
    data: {
      path,
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        dispatch(fetchFileBrowserDataAsync(path));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Upload {...props}>
        <Button
          type="text"
          icon={<UploadOutlined style={{ fontSize: '125%' }} />}
        >
          Upload
        </Button>
      </Upload>
    </div>
  );
};

export default UploadFile;
