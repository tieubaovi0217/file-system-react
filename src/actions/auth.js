import axios from 'axios';
import { authActions } from 'slices/auth';
import {
  removeCredentialsFromLocalStorage,
  saveCredentialsToLocalStorage,
} from 'common/localStorage';
import { buildPath } from 'common/helpers';

export const loginUserThunk = (username, password) => {
  return async (dispatch) => {
    const resp = await axios.post(
      buildPath('/auth/login'),
      {
        username,
        password,
      },
      {
        'Content-Type': 'application/json',
      },
    );
    const { user, token } = resp.data;
    dispatch(authActions.setCredentials(user));
    // dispatch(authActions.setUserAvatarURL(user.avatarUrl));

    saveCredentialsToLocalStorage({ user, token });

    return { user, token };
  };
};

export const signUpUserThunk = (userData) => {
  return async (dispatch) => {
    const resp = await axios.post(buildPath('/auth/signup'), userData, {
      'Content-Type': 'application/json',
    });
    const { token, user } = resp.data;
    dispatch(authActions.setCredentials(user));

    saveCredentialsToLocalStorage({ user, token });
    return { user, token };
  };
};

export const logoutUserThunk = () => {
  return (dispatch) => {
    dispatch(authActions.removeCredentials());
    removeCredentialsFromLocalStorage();
  };
};
