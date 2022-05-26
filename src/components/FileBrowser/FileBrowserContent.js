import * as mime from 'mime-types';
import { Row } from 'antd';

import ResourceItem from './ResourceItem';

const excludedMimeTypes = ['application/zip'];

const filterItems = (item) => {
  const mimeType = mime.lookup(item.name);
  return !excludedMimeTypes.includes(mimeType);
};

const FileBrowserContent = ({
  items,
  onFolderDoubleClick,
  onDownload,
  onDelete,
  onRename,
  onGetURL,
  onSyncDriveFile,
}) => {
  const handleDoubleClick = (name, isDirectory = false) => {
    if (isDirectory) return onFolderDoubleClick(name);
  };

  const filteredItems = items.filter(filterItems);

  const resourceItems = filteredItems.map((item) => (
    <ResourceItem
      driveFileId={item.id}
      key={item.name}
      mtime={item.mtime}
      name={item.name}
      mimeType={item.mimeType}
      isDirectory={item.type === 'directory'}
      size={item.size ? item.size : 0}
      onDelete={onDelete}
      onDownload={onDownload}
      onRename={onRename}
      onGetURL={onGetURL}
      onDoubleClick={handleDoubleClick}
      onSyncDriveFile={onSyncDriveFile}
    />
  ));

  return (
    <div className="file-browser__content">
      <Row gutter={[8, 12]}>{resourceItems}</Row>
    </div>
  );
};

export default FileBrowserContent;
