import React from 'react';

import { Col } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';

const Folder = ({ folderName, onDoubleClick }) => {
  const folderDoubleClickHandler = () => {
    onDoubleClick((prevResourcesPath) => `${prevResourcesPath}/${folderName}`);
  };

  return (
    <Col className="resource" span={3} onDoubleClick={folderDoubleClickHandler}>
      <div className="resource__icon">
        <FolderOpenFilled />
      </div>
      <div className="resource__name">{folderName}</div>
    </Col>
  );
};

export default Folder;
