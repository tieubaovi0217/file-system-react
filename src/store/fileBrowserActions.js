import { fileBrowserActions } from './fileBrowser';

import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';

export const fetchFileBrowserData = (path = '') => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/root/${path}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            localStorage.getItem('token') ? localStorage.getItem('token') : ''
          }`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch');

      const { data, totalSize } = await res.json();

      return {
        data: data.map((item) => {
          return {
            isFile: item.isFile,
            isDirectDirectory: item.isDirectDirectory,
            name: item.name,
            ext: item.ext,
            size: prettyBytes(item.size),
            relativePath: item.relativePath,
            lastModified: moment(item.lastModified).format(
              'DD/MM/YYYY HH:mm:ss',
            ),
          };
        }),
        totalSize,
      };
    };

    try {
      const { data, totalSize } = await getData();
      dispatch(fileBrowserActions.setData({ data, path, totalSize }));
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

export const deleteFileOrFolder = (relativePath) => {
  return async (dispatch) => {
    const deleteData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/root/delete/${relativePath}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem('token') ? localStorage.getItem('token') : ''
            }`,
          },
        },
      );
      if (!res.ok) throw new Error('Failed to delete');

      return res.json();
    };

    try {
      await deleteData();
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
