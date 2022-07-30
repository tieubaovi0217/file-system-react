import * as mime from 'mime-types';
import { Row, Empty } from 'antd';

import ResourceItem from './ResourceItem';
import FileViewerModal from './FileViewerModal';

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
  onGetDownloadURL,
}) => {
  const handleDoubleClick = (name, isDirectory = false) => {
    if (isDirectory) return onFolderDoubleClick(name);
  };

  const filteredItems = items.filter(filterItems);

  let content;
  if (filteredItems.length === 0) {
    content = (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Không có dữ liệu"
      />
    );
  } else {
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
        onGetDownloadURL={onGetDownloadURL}
      />
    ));
    content = <Row gutter={[8, 12]}>{resourceItems}</Row>;
  }

  return (
    <>
      <div className="file-browser__content">{content}</div>
      <FileViewerModal />
    </>
  );
};

export default FileBrowserContent;
