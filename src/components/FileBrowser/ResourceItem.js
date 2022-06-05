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
  VideoCameraOutlined,
} from '@ant-design/icons';

import FileInfoModal from './FileInfoModal';
import ModalForm from './ModalForm';
import { useIsMounted } from 'hooks/useIsMounted';

import { useDispatch } from 'react-redux';

import { fileActions } from 'slices/file';

import * as mime from 'mime-types';
import { ALLOWED_MIME_TYPES } from 'common/constants';

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
  onSyncDriveFile,
  driveFileId,
  mimeType,
  onGetDownloadURL,
}) => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [isShowRenameForm, setIsShowRenameForm] = useState(false);

  const handleRenameFormOpen = () => setIsShowRenameForm(true);

  const handleRenameFormCancel = () => {
    if (isMounted.current) setIsShowRenameForm(false);
  };

  let isDriveFile = true;
  if (!mimeType) {
    mimeType = mime.lookup(name);
    isDriveFile = false;
  }

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

  const handleSyncDriveFile = () => {
    console.log('drive fileId:', driveFileId);
    onSyncDriveFile(driveFileId);
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
    VIDEO: <VideoCameraOutlined />,
  };

  let icon = icons.UNKNOWN;
  if (isDirectory) {
    icon = icons.FOLDER;
  } else if (typeof mimeType === 'string') {
    if (mimeType.startsWith('image')) {
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
    } else if (mimeType.startsWith('video')) {
      icon = icons.VIDEO;
    }
  }

  const handleOpen = () => {
    if (isDirectory) {
      handleFolderOpen();
    } else {
      const mimeType = mime.lookup(name);
      let type;
      if (mimeType.startsWith('image')) {
        type = 'jpeg';
      } else if (mimeType.startsWith('video')) {
        type = 'mp4';
      } else if (mimeType === ALLOWED_MIME_TYPES.PDF) {
        type = 'pdf';
      } else if (mimeType === ALLOWED_MIME_TYPES.DOCX) {
        type = 'docx';
      } else if (mimeType === ALLOWED_MIME_TYPES.XLSX) {
        type = 'xlsx';
      } else if (mimeType === ALLOWED_MIME_TYPES.PPTX) {
        type = 'pptx';
      }
      const url = onGetDownloadURL(name);
      dispatch(fileActions.setFile({ url, type }));
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleOpen}>
        Open
      </Menu.Item>
      <Menu.Item key="1" onClick={handleShowInfoModal}>
        Get Info
      </Menu.Item>
      {!isDriveFile && (
        <>
          <Menu.Item key="2" onClick={handleRenameFormOpen}>
            Rename
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="3"
            className="red-text"
            onClick={() => onDelete(name)}
          >
            Delete
          </Menu.Item>
        </>
      )}
      {!isDirectory && (
        <>
          <Menu.Divider />

          {isDriveFile ? (
            <Menu.Item
              key="4"
              className="blue-text"
              onClick={handleSyncDriveFile}
            >
              Download to server
            </Menu.Item>
          ) : (
            <Menu.Item key="4" className="blue-text" onClick={handleDownload}>
              Download
            </Menu.Item>
          )}
          {!isDriveFile && (
            <>
              <Menu.Divider />
              <Menu.Item
                key="5"
                className="blue-text"
                onClick={() => onGetURL(name)}
              >
                Get Content URL
              </Menu.Item>
            </>
          )}
        </>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col
          xl={3}
          lg={4}
          md={4}
          sm={6}
          xs={8}
          onDoubleClick={handleFolderOpen}
        >
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
