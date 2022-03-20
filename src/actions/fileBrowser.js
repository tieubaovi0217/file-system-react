import { fileBrowserActions } from '../slices/fileBrowser';

export const fetchFileBrowserDataAsync = (path) => {
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
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      return res.json();
    };

    const { data, totalSize } = await getData();
    await dispatch(fileBrowserActions.setData({ data, path, totalSize }));
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
