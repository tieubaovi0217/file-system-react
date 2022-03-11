import { fileBrowserActions } from './fileBrowser';

import { message } from 'antd';

import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';

export const fetchFileBrowserData = (url) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      return data.map((item) => {
        return {
          isFile: item.isFile,
          isDirectDirectory: item.isDirectDirectory,
          name: item.name,
          ext: item.ext,
          size: prettyBytes(item.size),
          relativePath: item.relativePath,
          lastModified: moment(item.lastModified).format('DD/MM/YYYY HH:mm:ss'),
        };
      });
    };

    dispatch(fileBrowserActions.setLoading(true));

    try {
      const data = await fetchData();
      dispatch(fileBrowserActions.setData(data));
      dispatch(fileBrowserActions.setUrl(url));
    } catch (err) {
      console.log(err);
      message.error(err.message, 1); // display error message
    }

    dispatch(fileBrowserActions.setLoading(false));
  };
};
