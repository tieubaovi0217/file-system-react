import { fileBrowserActions } from 'slices/fileBrowser';

// TODO fix hardcoded username='admin'
export const fetchFileBrowserDataAsync = (path, username = 'admin') => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_WEB_SERVER_URL}/root/${username}${path}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              localStorage.getItem('token') ? localStorage.getItem('token') : ''
            }`,
          },
        },
      );
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      return res.json();
    };

    const data = await getData();
    await dispatch(fileBrowserActions.setData({ data, path }));
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
