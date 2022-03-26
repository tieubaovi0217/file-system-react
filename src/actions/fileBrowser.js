import axios from 'axios';
import { fileBrowserActions } from 'slices/fileBrowser';
import { getUserFromLocalStorage } from 'common/localStorage';

// TODO fix hardcoded username='admin'
export const fetchFileBrowserDataAsync = (path) => {
  return async (dispatch) => {
    const user = getUserFromLocalStorage();
    const resp = await axios.get(
      `${process.env.REACT_APP_WEB_SERVER_URL}/root/${user.username}${path}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            localStorage.getItem('token') ? localStorage.getItem('token') : ''
          }`,
        },
      },
    );

    const data = resp.data;
    dispatch(fileBrowserActions.setData({ data, path }));
    localStorage.setItem('currentPath', path);
    return data;
  };
};

export const createNewFolderAsync = (relativePath, newFolderName) => {
  return async (dispatch) => {
    const sendCreateNewFolder = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/root/mkdir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            localStorage.getItem('token') ? localStorage.getItem('token') : ''
          }`,
        },
        body: JSON.stringify({ relativePath, newFolderName }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      return res.json();
    };

    await sendCreateNewFolder();
  };
};
