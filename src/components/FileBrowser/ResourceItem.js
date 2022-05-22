import { useState } from 'react';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';
import {
  FileOutlined,
  FolderOpenFilled,
  FileImageOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
} from '@ant-design/icons';

import FileInfoModal from './FileInfoModal';
import ModalForm from './ModalForm';
import { useIsMounted } from 'hooks/useIsMounted';

import * as mime from 'mime-types';

const ResourceItem = ({
  name,
  mimeType,
  isDirectory,
  mtime,
  size,
  onDelete,
  onDownload,
  onRename,
  onDoubleClick,
  onGetURL,
}) => {
  const isMounted = useIsMounted();
  const [isShowRenameForm, setIsShowRenameForm] = useState(false);

  const handleRenameFormOpen = () => setIsShowRenameForm(true);

  const handleRenameFormCancel = () => {
    if (isMounted.current) setIsShowRenameForm(false);
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

  const handleDownload = () => {
    if (!isDirectory) {
      onDownload(name);
    }
  };

  const handleFolderOpen = () => {
    onDoubleClick(name, isDirectory);
  };

  const icons = {
    FOLDER: <FolderOpenFilled />,
    IMAGE: <FileImageOutlined />,
    TEXT: <FileTextOutlined />,
    UNKNOWN: <FileOutlined />,
    PDF: <FilePdfOutlined />,
    WORD: <FileWordOutlined />,
    EXCEL: <FileExcelOutlined />,
    PPT: <FilePptOutlined />,
  };

  let icon;
  if (!mimeType) {
    mimeType = mime.lookup(name);
  }
  if (isDirectory) {
    icon = icons.FOLDER;
  } else if (mimeType.startsWith('image')) {
    icon = icons.IMAGE;
  } else if (mimeType.startsWith('text')) {
    icon = icons.TEXT;
  } else if (mimeType === 'application/pdf') {
    icon = icons.PDF;
  } else if (
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    icon = icons.WORD;
  } else if (
    mimeType === 'application/vnd.ms-excel' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    icon = icons.EXCEL;
  } else if (
    mimeType === 'application/vnd.ms-powerpoint' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    icon = icons.PPT;
  } else {
    icon = icons.UNKNOWN;
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleFolderOpen}>
        Open
      </Menu.Item>
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
      <Menu.Item key="4" className="blue-text" onClick={handleDownload}>
        Download
      </Menu.Item>
      {!isDirectory && (
        <>
          <Menu.Divider />
          <Menu.Item key="5" onClick={() => onGetURL(name)}>
            Get URL
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col span={3} onDoubleClick={handleFolderOpen}>
          <Tooltip title={name}>
            <div className="resource">
              <div className="resource__icon">{icon}</div>

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
