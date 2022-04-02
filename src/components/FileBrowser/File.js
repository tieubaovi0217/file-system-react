import React from 'react';

import { Col, Dropdown, Menu, Modal, Tooltip } from 'antd';

import { FileOutlined } from '@ant-design/icons';

import prettyBytes from 'pretty-bytes';
import * as moment from 'moment';

const File = ({ name, mtime, size, onDelete, onDownload }) => {
  const handleOpenFile = () => {
    console.log('file open');
  };

  const handleRename = () => {};

  const showInfoModal = () => {
    Modal.info({
      title: 'File Info',
      content: (
        <div>
          <div className="file-info-icon">
            <FileOutlined />
          </div>
          <div className="file-info-modal">
            <table>
              <tbody>
                <tr>
                  <td align="right">
                    <strong>Name: </strong>
                  </td>
                  <td align="center">{name}</td>
                </tr>
                <tr>
                  <td align="right">
                    <strong>Size: </strong>
                  </td>
                  <td align="center">{prettyBytes(size)}</td>
                </tr>
                <tr>
                  <td align="right">
                    <strong>Last modified: </strong>
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
      <Menu.Item key="2" onClick={handleRename}>
        Rename
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        style={{ color: 'red' }}
        onClick={() => onDelete(name)}
      >
        Delete
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="4"
        style={{ color: 'blue' }}
        onClick={() => onDownload(name)}
      >
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
