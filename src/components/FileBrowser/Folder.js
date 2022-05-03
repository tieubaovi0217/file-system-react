import './styles.css';

import { useState } from 'react';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';
import FileInfoModal from './FileInfoModal';
import ModalForm from './ModalForm';

const Folder = ({
  name,
  mtime,
  onDelete,
  onDownload,
  onDoubleClick,
  onRename,
}) => {
  const [isShowRenameForm, setIsShowRenameForm] = useState(false);

  const handleRenameFormOpen = () => setIsShowRenameForm(true);

  const handleRenameFormCancel = () => setIsShowRenameForm(false);

  const handleDownload = () => {
    // onDownload(name);
    // not implemented
  };

  const showInfoModal = () => {
    Modal.info({
      title: 'Detail Info',
      content: <FileInfoModal name={name} mtime={mtime} isDirectory={true} />,
      onOk() {},
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">Open</Menu.Item>
      <Menu.Item key="1" onClick={showInfoModal}>
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
      <Menu.Item key="4" className="blue-text" onClick={handleDownload}>
        Download
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col span={3} onDoubleClick={() => onDoubleClick(name)}>
          <Tooltip title={name}>
            <div className="resource">
              <div className="resource__icon">
                <FolderOpenFilled />
              </div>
              <div className="resource__name disable-text-selection">
                {name}
              </div>
            </div>
          </Tooltip>
        </Col>
      </Dropdown>
      <ModalForm
        modalTitle="Rename folder"
        inputPlaceholder="New folder name"
        defaultValue={name}
        onConfirm={onRename}
        isVisible={isShowRenameForm}
        onCancel={handleRenameFormCancel}
      />
    </>
  );
};

export default Folder;
