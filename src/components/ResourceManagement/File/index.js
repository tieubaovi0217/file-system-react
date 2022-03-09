import React from 'react';

import { Col, Dropdown, Menu } from 'antd';

import { FileOutlined } from '@ant-design/icons';

const File = ({ fileName, onDoubleClick }) => {
  const fileDoubleClickHandler = () => {
    console.log(fileName);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">Open</Menu.Item>
      <Menu.Item key="1">Get Info</Menu.Item>
      <Menu.Item key="2">Rename</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" style={{ color: 'red' }}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Col className="resource" span={3} onDoubleClick={fileDoubleClickHandler}>
        <div className="resource__icon">
          <FileOutlined />
        </div>
        <div className="resource__name">{fileName}</div>
      </Col>
    </Dropdown>
  );
};

export default File;
