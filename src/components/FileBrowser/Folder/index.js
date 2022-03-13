import React from 'react';

import { Col, Dropdown, Menu } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFileBrowserData } from '../../../store/fileBrowserActions';

const Folder = ({ folderName, onDoubleClick }) => {
  const dispatch = useDispatch();

  const path = useSelector((state) => state.fileBrowser.path);

  const folderDoubleClickedHandler = () => {
    const newPath = `${path}/${folderName}`;
    dispatch(fetchFileBrowserData(newPath));
  };

  const folderRightClickedHandler = (e) => {
    e.stopPropagation();
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
      <Col
        className="resource"
        span={3}
        onDoubleClick={folderDoubleClickedHandler}
        onContextMenu={folderRightClickedHandler}
      >
        <div className="resource__icon">
          <FolderOpenFilled />
        </div>
        <div className="resource__name">{folderName}</div>
      </Col>
    </Dropdown>
  );
};

export default Folder;
