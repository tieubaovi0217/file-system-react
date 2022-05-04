import { Row } from 'antd';

import ResourceItem from './ResourceItem';

const FileBrowserContent = ({
  items,
  onFolderDoubleClick,
  onDownload,
  onDelete,
  onRename,
}) => {
  const handleDoubleClick = (name, isDirectory = false) => {
    if (isDirectory) return onFolderDoubleClick(name);
  };

  const resourceItems = items.map((item) => (
    <ResourceItem
      key={item.name}
      mtime={item.mtime}
      name={item.name}
      onDelete={onDelete}
      onDownload={onDownload}
      onRename={onRename}
      isDirectory={item.type === 'directory'}
      size={item.size ? item.size : 0}
      onDoubleClick={handleDoubleClick}
    />
  ));

  return (
    <div className="file-browser__content">
      <Row gutter={[8, 8]}>{resourceItems}</Row>
    </div>
  );
};

export default FileBrowserContent;
