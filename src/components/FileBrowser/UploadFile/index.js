import { Upload, Button, message } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFileBrowserData } from '../../../store/fileBrowserActions';

const UploadFile = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const path = useSelector((state) => state.fileBrowser.path);

  //TODO: fix issue long file name
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
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`, 1);
        dispatch(fetchFileBrowserData(path));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`, 1);
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
