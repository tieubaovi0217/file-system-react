import './styles.css';

import { useState } from 'react';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';
import { FileOutlined } from '@ant-design/icons';

import FileInfoModal from './FileInfoModal';
import ModalForm from './ModalForm';

const File = ({ name, mtime, size, onDelete, onDownload, onRename }) => {
  const [isShowRenameForm, setIsShowRenameForm] = useState(false);

  const handleRenameFormOpen = () => setIsShowRenameForm(true);

  const handleRenameFormCancel = () => setIsShowRenameForm(false);

  const showInfoModal = () => {
    Modal.info({
      title: 'File Info',
      content: (
        <FileInfoModal
          name={name}
          mtime={mtime}
          size={size}
          isDirectory={false}
        />
      ),
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
      <Menu.Item key="4" className="blue-text" onClick={() => onDownload(name)}>
        Download
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col span={3}>
          <Tooltip title={name}>
            <div className="resource">
              <div className="resource__icon">
                <FileOutlined />
              </div>

              <div className="resource__name disable-text-selection">
                {name}
              </div>
            </div>
          </Tooltip>
        </Col>
      </Dropdown>
      <ModalForm
        modalTitle="Rename file"
        inputPlaceholder="New file name"
        defaultValue={name}
        onConfirm={onRename}
        isVisible={isShowRenameForm}
        onCancel={handleRenameFormCancel}
      />
    </>
  );
};

export default File;
