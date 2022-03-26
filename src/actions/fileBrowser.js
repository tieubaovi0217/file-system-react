import axios from 'axios';
import { fileBrowserActions } from 'slices/fileBrowser';
import { getUserFromLocalStorage } from 'common/localStorage';

export const fetchFileBrowserDataThunk = (path) => {
  return async (dispatch) => {
    try {
      const { username } = getUserFromLocalStorage();
      const resp = await axios.get(
        `${process.env.REACT_APP_WEB_SERVER_URL}/roots/${username}${path}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      const data = resp.data;
      dispatch(fileBrowserActions.setData({ data, path }));
      localStorage.setItem('currentPath', path);
      return data;
    } catch (err) {
      console.log(err.response);
      return Promise.reject(
        err.response.data?.message || err.response.statusText,
      );
    }
  };
};

// export const createNewFolderThunk = (relativePath, newFolderName) => {
//   return async (dispatch) => {
//     const resp = await axios.post(
//       `${process.env.REACT_APP_API_URL}/root/mkdir`,
//       { relativePath, newFolderName },
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${
//             localStorage.getItem('token') ? localStorage.getItem('token') : ''
//           }`,
//         },
//       },
//     );
//     console.log(resp.data);
//   };
// };

export const deleteResourceThunk = (relativePath, name) => {};
