import React from 'react';

import { Col } from 'antd';

import { FileOutlined } from '@ant-design/icons';

const File = ({ fileName, onDoubleClick }) => {
  const fileDoubleClickHandler = () => {
    console.log(fileName);
  };

  return (
    <Col className="resource" span={3} onDoubleClick={fileDoubleClickHandler}>
      <div className="resource__icon">
        <FileOutlined />
      </div>
      <div className="resource__name">{fileName}</div>
    </Col>
  );
};

export default File;
