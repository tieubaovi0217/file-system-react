import React from 'react';

import * as moment from 'moment';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';

const Folder = ({ name, mtime, onDelete, onDownload, onDoubleClick }) => {
  const handleRightClick = (e) => {};

  const handleDownload = () => {
    // onDownload(name);
  };

  const showInfoModal = () => {
    Modal.info({
      title: 'Detail Info',
      content: (
        <div>
          <div className="file-info-icon">
            <FolderOpenFilled />
          </div>
          <div className="file-info-modal">
            <table>
              <tbody>
                <tr>
                  <td align="right">
                    <strong>Name:</strong>
                  </td>
                  <td align="center">{name}</td>
                </tr>
                <tr>
                  <td align="right">
                    <strong>Type: </strong>
                  </td>
                  <td align="center">Directory</td>
                </tr>
                <tr>
                  <td align="right">
                    <strong>Last modified:</strong>
                  </td>
                  <td align="center">
                    {moment(mtime).format('DD/MM/YYYY HH:mm:ss')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      <Menu.Item
        key="3"
        style={{ color: 'red' }}
        onClick={() => onDelete(name)}
      >
        Delete
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" style={{ color: 'blue' }} onClick={handleDownload}>
        Download
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Col
        span={3}
        onDoubleClick={() => onDoubleClick(name)}
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
