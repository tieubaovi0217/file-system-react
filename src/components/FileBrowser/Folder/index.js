import React from 'react';

import * as moment from 'moment';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';

const Folder = ({ name, size, mtime, path, onDelete, onDoubleClick }) => {
  const handleDoubleClick = () => {
    onDoubleClick(name);
  };

  const handleRightClick = (e) => {};

  const handleDeleteFolder = () => {
    // onDelete(relativePath, name);
  };

  const showInfoModal = () => {
    Modal.info({
      title: 'File Info',
      content: (
        <div>
          <FolderOpenFilled className="info-modal__icon" />
          <table className="info-modal">
            <tbody>
              <tr>
                <td align="right">
                  <strong>Name:</strong>
                </td>
                <td>{name}</td>
              </tr>
              <tr>
                <td align="right">
                  <strong>Size:</strong>
                </td>
                <td>{size}</td>
              </tr>
              <tr>
                <td align="right">
                  <strong>Last modified:</strong>
                </td>
                <td>{moment(mtime).format('DD/MM/YYYY HH:mm:ss')}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      <Menu.Item key="2">Rename</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" style={{ color: 'red' }} onClick={handleDeleteFolder}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Col
        span={3}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleRightClick}
      >
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
