import React from 'react';

import { Row } from 'antd';

import File from './File';
import Folder from './Folder';

const FileBrowserContent = ({
  items,
  onFolderDoubleClick,
  onDownload,
  onDelete,
}) => {
  const files = items
    .filter((item) => item.type === 'file')
    .map((file) => (
      <File
        key={file.name}
        name={file.name}
        mtime={file.mtime}
        size={file.size}
        onDelete={onDelete}
        onDownload={onDownload}
      />
    ));

  const folders = items
    .filter((item) => item.type === 'directory')
    .map((folder) => (
      <Folder
        key={folder.name}
        mtime={folder.mtime}
        name={folder.name}
        onDelete={onDelete}
        onDoubleClick={() => onFolderDoubleClick(folder.name)}
        onDownload={onDownload}
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
