import React from 'react';

import { Col, Dropdown, Menu } from 'antd';

import { FileOutlined } from '@ant-design/icons';

const File = ({ fileName, onDoubleClick, onDeleteFile }) => {
  const fileRightClickedHandler = (e) => {
    e.stopPropagation();
  };

  const openFileHandler = () => {
    console.log('file open');
  };

  const deleteFileHandler = () => {};

  const renameFileHandler = () => {};

  const menu = (
    <Menu>
      <Menu.Item key="0">Open</Menu.Item>
      <Menu.Item key="1">Get Info</Menu.Item>
      <Menu.Item key="2" onClick={renameFileHandler}>
        Rename
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" style={{ color: 'red' }} onClick={deleteFileHandler}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Col
        className="resource"
        span={3}
        onContextMenu={fileRightClickedHandler}
        onDoubleClick={openFileHandler}
      >
        <div className="resource__icon">
          <FileOutlined />
        </div>
        <div className="resource__name">{fileName}</div>
      </Col>
    </Dropdown>
  );
};

export default File;
