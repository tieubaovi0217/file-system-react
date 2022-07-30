import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';

import { Tooltip, Divider } from 'antd';

import { truncateFileName } from 'common/helpers';

const FileInfoModal = ({ name, mtime, size, isDirectory, icon }) => {
  return (
    <div>
      <div className="file-info-icon">{icon}</div>

      <Divider />
      <div className="file-info-modal">
        <table>
          <tbody>
            <tr>
              <td align="right">
                <div>
                  <strong>Tên file:</strong>
                </div>
              </td>
              <Tooltip title={name}>
                <td align="center">{truncateFileName(name)}</td>
              </Tooltip>
            </tr>
            <tr>
              <td align="right">
                <strong>Loại: </strong>
              </td>
              <td align="center">{isDirectory ? 'Thư mục' : 'Tập tin'}</td>
            </tr>
            {!isDirectory && (
              <tr>
                <td align="right">
                  <strong>Kích thước: </strong>
                </td>
                <td align="center">
                  {prettyBytes(typeof size === 'string' ? Number(size) : size)}
                </td>
              </tr>
            )}
            {mtime && (
              <tr>
                <td align="right">
                  <strong>Chỉnh sửa lần cuối:</strong>
                </td>
                <td align="center">
                  {moment(mtime).format('DD/MM/YYYY HH:mm:ss')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileInfoModal;
