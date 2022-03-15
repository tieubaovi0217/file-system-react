import React from 'react';
import prettyBytes from 'pretty-bytes';
import { useDispatch, useSelector } from 'react-redux';

import UploadFile from '../UploadFile';
import UploadFolder from '../UploadFolder';

import { Button, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { fetchFileBrowserData } from '../../../store/fileBrowserActions';

const FileBrowserFooter = () => {
  const dispatch = useDispatch();
  const totalSize = useSelector((state) => state.fileBrowser.totalSize);
  const path = useSelector((state) => state.fileBrowser.path);

  const refreshContentHandler = () => {
    message.loading('Syncing...', 10);
    setTimeout(() => {
      dispatch(fetchFileBrowserData(path))
        .then((res) => {
          console.log(res);
          message.destroy();
          message.success('Synced', 1);
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message, 1);
        });
    }, 1000); // simulate 1s :))
  };

  return (
    <div className="file-browser__actions">
      <div className="file-browser__upload-folder">
        <UploadFolder />
      </div>
      <div className="file-browser__upload-file">
        <UploadFile />
      </div>
      <div className="file-browser__refresh">
        <Button
          type="text"
          icon={<SyncOutlined spin />}
          onClick={refreshContentHandler}
        >
          Refresh
        </Button>
      </div>

      <div className="file-browser__total-size">
        <strong>Size: </strong>
        {prettyBytes(totalSize)}
      </div>
    </div>
  );
};

export default FileBrowserFooter;
