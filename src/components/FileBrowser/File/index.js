import React from 'react';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';

import { FileOutlined } from '@ant-design/icons';

import prettyBytes from 'pretty-bytes';
import * as moment from 'moment';

const File = ({ name, mtime, size, onDelete }) => {
  const handleOpenFile = () => {
    console.log('file open');
  };

  const handleDeleteFile = () => {
    // onDelete(relativePath, name);
  };

  const handleRename = () => {};

  const handleDownload = () => {};

  const showInfoModal = () => {
    Modal.info({
      title: 'File Info',
      content: (
        <div>
          <FileOutlined className="file-info-modal__icon" />
          <table className="file-info-modal">
            <tbody>
              <tr>
                <td align="right">
                  <strong>Name: </strong>
                </td>
                <td>{name}</td>
              </tr>
              <tr>
                <td align="right">
                  <strong>Size: </strong>
                </td>
                <td>{prettyBytes(size)}</td>
              </tr>
              <tr>
                <td align="right">
                  <strong>Last modified: </strong>
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
      <Menu.Item key="2" onClick={handleRename}>
        Rename
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" style={{ color: 'red' }} onClick={handleDeleteFile}>
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
      <Col span={3} onDoubleClick={handleOpenFile}>
        <Tooltip title={name}>
          <div className="resource">
            <div className="resource__icon">
              <FileOutlined />
            </div>

            <div className="resource__name disable-text-selection">{name}</div>
          </div>
        </Tooltip>
      </Col>
    </Dropdown>
  );
};

export default File;
