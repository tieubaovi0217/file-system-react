import { useState } from 'react';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';
import { FileOutlined, FolderOpenFilled } from '@ant-design/icons';

import FileInfoModal from './FileInfoModal';
import ModalForm from './ModalForm';

const ResourceItem = ({
  name,
  isDirectory,
  mtime,
  size,
  onDelete,
  onDownload,
  onRename,
  onDoubleClick,
  onGetURL,
}) => {
  const [isShowRenameForm, setIsShowRenameForm] = useState(false);

  const handleRenameFormOpen = () => setIsShowRenameForm(true);

  const handleRenameFormCancel = () => {
    setIsShowRenameForm(false);
  };

  const handleShowInfoModal = () => {
    Modal.info({
      title: 'Detail Info',
      content: (
        <FileInfoModal
          name={name}
          mtime={mtime}
          size={size}
          isDirectory={isDirectory}
        />
      ),
      onOk() {},
    });
  };

  const handleRename = (newPath) => {
    if (newPath.trim().length === 0 || newPath === name) return;
    onRename(name, newPath.trim());
  };

  const resourceIcon = isDirectory ? <FolderOpenFilled /> : <FileOutlined />;

  const menu = (
    <Menu>
      <Menu.Item key="0">Open</Menu.Item>
      <Menu.Item key="1" onClick={handleShowInfoModal}>
        Get Info
      </Menu.Item>
      <Menu.Item key="2" onClick={handleRenameFormOpen}>
        Rename
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" className="red-text" onClick={() => onDelete(name)}>
        Delete
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" className="blue-text" onClick={() => onDownload(name)}>
        Download
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" onClick={() => onGetURL(name)}>
        Get URL
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col span={3} onDoubleClick={() => onDoubleClick(name, isDirectory)}>
          <Tooltip title={name}>
            <div className="resource">
              <div className="resource__icon">{resourceIcon}</div>

              <div className="resource__name disable-text-selection">
                {name}
              </div>
            </div>
          </Tooltip>
        </Col>
      </Dropdown>
      <ModalForm
        modalTitle="Rename"
        inputPlaceholder="New name"
        defaultValue={name}
        isVisible={isShowRenameForm}
        onConfirm={handleRename}
        onCancel={handleRenameFormCancel}
      />
    </>
  );
};

export default ResourceItem;
