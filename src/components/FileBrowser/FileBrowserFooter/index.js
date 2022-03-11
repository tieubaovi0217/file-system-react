import React from 'react';

import UploadFile from '../UploadFile';
import UploadFolder from '../UploadFolder';

const FileBrowserFooter = () => {
  return (
    <div className="file-browser__footer">
      <UploadFile />
      <UploadFolder />
    </div>
  );
};

export default FileBrowserFooter;
