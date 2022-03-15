import React from 'react';

import { Col, Dropdown, Menu, message, Modal, Tooltip } from 'antd';

import { FileOutlined } from '@ant-design/icons';
import {
  deleteFileOrFolder,
  fetchFileBrowserData,
} from '../../../store/fileBrowserActions';
import { useDispatch, useSelector } from 'react-redux';

import { normalizeRelativePath } from '../../../helpers';

const File = ({ fileInfo }) => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.fileBrowser.path);
  const { name, size, lastModified, ext, relativePath } = fileInfo;

  const fileRightClickedHandler = (e) => {};

  const openFileHandler = () => {
    console.log('file open');
  };

  const deleteFileHandler = () => {
    dispatch(deleteFileOrFolder(normalizeRelativePath(relativePath)))
      .then((res) => {
        console.log(res);
        message.success(`Delete file ${name} successfully`, 0.5);
        dispatch(fetchFileBrowserData(path));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renameFileHandler = () => {};

  const showInfoModal = () => {
    Modal.info({
      title: 'File Info',
      content: (
        <div>
          <FileOutlined className="info-modal__icon" />
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
                  <strong>Type of file:</strong>
                </td>
                <td>{ext}</td>
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
        span={process.env.REACT_APP_FILE_FOLDER_SPAN}
        onContextMenu={fileRightClickedHandler}
        onDoubleClick={openFileHandler}
      >
        <Tooltip title={name}>
          <div className="resource">
            <div className="resource__icon">
              <FileOutlined />
            </div>

            <div className="resource__name">{name}</div>
          </div>
        </Tooltip>
      </Col>
    </Dropdown>
  );
};

export default File;
