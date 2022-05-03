import './styles.css';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';
import FileInfoModal from './FileInfoModal';

const Folder = ({
  name,
  mtime,
  onDelete,
  onDownload,
  onDoubleClick,
  onRenameFormOpen,
}) => {
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
      <Menu.Item key="2" onClick={onRenameFormOpen}>
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
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Col span={3} onDoubleClick={() => onDoubleClick(name)}>
        <Tooltip title={name}>
          <div className="resource">
            <div className="resource__icon">
              <FolderOpenFilled />
            </div>
            <div className="resource__name disable-text-selection">{name}</div>
          </div>
        </Tooltip>
      </Col>
    </Dropdown>
  );
};

export default Folder;
