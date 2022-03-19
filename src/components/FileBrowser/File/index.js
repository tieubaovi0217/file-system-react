import React from 'react';

import { Col, Dropdown, Menu, message, Modal, Tooltip } from 'antd';

import { FileOutlined } from '@ant-design/icons';
import {
  deleteFileOrFolderAsync,
  fetchFileBrowserDataAsync,
} from '../../../actions/fileBrowser';
import { useDispatch } from 'react-redux';

import { normalizeRelativePath } from '../../../helpers';
import prettyBytes from 'pretty-bytes';
import * as moment from 'moment';

const File = ({ fileInfo, path }) => {
  const dispatch = useDispatch();
  const { name, size, lastModified, ext, relativePath } = fileInfo;

  const openFileHandler = () => {
    console.log('file open');
  };

  const deleteFileHandler = () => {
    dispatch(deleteFileOrFolderAsync(path, normalizeRelativePath(relativePath)))
      .then(() => {
        return dispatch(fetchFileBrowserDataAsync(path));
      })
      .then(() => {
        message.success(`Delete file ${name} successfully`);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
  };

  const renameFileHandler = () => {};

  const downloadFileHandler = () => {};

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
                  <strong>Type of file: </strong>
                </td>
                <td>{ext}</td>
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
                <td>{moment(lastModified).format('DD/MM/YYYY HH:mm:ss')}</td>
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
      <Menu.Divider />
      <Menu.Item
        key="4"
        style={{ color: 'blue' }}
        onClick={downloadFileHandler}
      >
        Download
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Col
        span={process.env.REACT_APP_FILE_FOLDER_SPAN}
        onDoubleClick={openFileHandler}
      >
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
