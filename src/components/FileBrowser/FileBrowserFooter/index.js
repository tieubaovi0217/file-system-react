import React from 'react';
import prettyBytes from 'pretty-bytes';
import { useSelector } from 'react-redux';

import UploadFile from '../UploadFile';
import UploadFolder from '../UploadFolder';

const FileBrowserFooter = () => {
  const totalSize = useSelector((state) => state.fileBrowser.totalSize);

  return (
    <div className="file-browser__footer">
      <span>
        <strong>Total Size:</strong> {prettyBytes(totalSize)}
      </span>
      <div className="file-browser__actions">
        <div className="file-browser__upload">
          <UploadFile />
        </div>
        <UploadFolder />
      </div>
    </div>
  );
};

export default FileBrowserFooter;
