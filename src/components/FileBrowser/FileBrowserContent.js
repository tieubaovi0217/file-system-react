import axios from 'axios';
import React from 'react';

import { Row, message } from 'antd';

import File from './File';
import Folder from './Folder';

const FileBrowserContent = ({
  items,
  path,
  onFolderDoubleClick,
  onDownload,
}) => {
  const handleDeleteFileOrFolder = async (relativePath, name) => {};

  const handleResourceDownload = (name) => {
    onDownload(name);
  };

  const files = items
    .filter((item) => item.type === 'file')
    .map((file) => (
      <File
        key={file.name}
        name={file.name}
        mtime={file.mtime}
        size={file.size}
        onDelete={handleDeleteFileOrFolder}
        onDownload={handleResourceDownload}
      />
    ));

  const folders = items
    .filter((item) => item.type === 'directory')
    .map((folder) => (
      <Folder
        path={path}
        key={folder.name}
        mtime={folder.mtime}
        name={folder.name}
        size={folder.size}
        onDelete={handleDeleteFileOrFolder}
        onDoubleClick={() => onFolderDoubleClick(folder.name)}
        onDownload={handleResourceDownload}
      />
    ));

  return (
    <div className="file-browser__content">
      <Row gutter={[8, 8]}>
        {folders}
        {files}
      </Row>
    </div>
  );
};

export default FileBrowserContent;
