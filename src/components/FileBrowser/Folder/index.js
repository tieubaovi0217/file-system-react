import React from 'react';

import { Col, Dropdown, Menu, Modal } from 'antd';

import { FolderOpenFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFileBrowserData } from '../../../store/fileBrowserActions';

const Folder = ({ folderInfo, onDoubleClick }) => {
  const { name, size, lastModified } = folderInfo;

  const dispatch = useDispatch();
  const path = useSelector((state) => state.fileBrowser.path);

  const folderDoubleClickedHandler = () => {
    dispatch(fetchFileBrowserData(`${path}/${folderInfo.name}`));
  };

  const folderRightClickedHandler = (e) => {};

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
                <td>{lastModified}</td>
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
        <div className="resource__name">{name}</div>
      </Col>
    </Dropdown>
  );
};

export default Folder;
