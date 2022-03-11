import React from 'react';

import { Row } from 'antd';

import File from '../File';
import Folder from '../Folder';

const FileBrowserContent = ({ items }) => {
  const files = items
    .filter((item) => item.isFile)
    .map((file) => <File key={`${file.relativePath}`} fileName={file.name} />);

  const folders = items
    .filter((item) => item.isDirectDirectory)
    .map((folder) => (
      <Folder key={`${folder.relativePath}`} folderName={folder.name} />
    ));

  return (
    <div className="file-browser__content">
      <Row gutter={[8, 12]}>
        {folders}
        {files}
      </Row>
    </div>
  );
};

export default FileBrowserContent;
