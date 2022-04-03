import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';

import { Tooltip, Divider } from 'antd';

import { FolderOpenFilled, FileOutlined } from '@ant-design/icons';
import { truncateFileName } from 'common/helpers';

const FileInfoModal = ({ name, mtime, size, isDirectory }) => {
  return (
    <div>
      <div className="file-info-icon">
        {isDirectory && <FolderOpenFilled />}
        {!isDirectory && <FileOutlined />}
      </div>

      <Divider />
      <div className="file-info-modal">
        <table>
          <tbody>
            <tr>
              <td align="right">
                <div>
                  <strong>Name:</strong>
                </div>
              </td>
              <Tooltip title={name}>
                <td align="center">{truncateFileName(name)}</td>
              </Tooltip>
            </tr>
            <tr>
              <td align="right">
                <strong>Type: </strong>
              </td>
              <td align="center">{isDirectory ? 'Directory' : 'File'}</td>
            </tr>
            {!isDirectory && (
              <tr>
                <td align="right">
                  <strong>Size: </strong>
                </td>
                <td align="center">{prettyBytes(size)}</td>
              </tr>
            )}
            <tr>
              <td align="right">
                <strong>Last modified:</strong>
              </td>
              <td align="center">
                {moment(mtime).format('DD/MM/YYYY HH:mm:ss')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileInfoModal;
