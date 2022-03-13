import { fileBrowserActions } from './fileBrowser';

import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';

export const fetchFileBrowserData = (path) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json',
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
      const { data, totalSize } = await fetchData();
      dispatch(fileBrowserActions.setData({ data, path, totalSize }));
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
