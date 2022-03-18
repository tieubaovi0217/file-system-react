import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFileBrowserDataAsync } from '../../../actions/fileBrowser';

const UploadFile = () => {
  const dispatch = useDispatch();
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
        dispatch(fetchFileBrowserDataAsync(path));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`, 1);
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
