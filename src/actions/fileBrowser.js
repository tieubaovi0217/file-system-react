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
      if (!res.ok) throw new Error('Failed to fetch');

      const { data, totalSize } = await res.json();

      return {
        data: data.map((item) => {
          return {
            isFile: item.isFile,
            isDirectDirectory: item.isDirectDirectory,
            name: item.name,
            ext: item.ext,
            size: item.size,
            relativePath: item.relativePath,
            lastModified: item.lastModified,
          };
        }),
        totalSize,
      };
    };

    try {
      const { data, totalSize } = await getData();
      await dispatch(fileBrowserActions.setData({ data, path, totalSize }));
      localStorage.setItem('currentPath', path);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

export const deleteFileOrFolderAsync = (currentPath, relativePath) => {
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

      if (!res.ok) throw new Error('Create new folder failed');
      return true;
    };

    try {
      await sendCreateNewFolder();
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
