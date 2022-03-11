import { authActions } from './auth';

export const loginUser = (userData) => {
  return async (dispatch) => {
    const sendLogin = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();
      return data;
    };

    dispatch(authActions.setIsAuthenticating(true));
    try {
      const res = await sendLogin();
      dispatch(authActions.login(res));
      dispatch(authActions.setIsAuthenticating(false));
      return Promise.resolve(true);
    } catch (err) {
      dispatch(authActions.setIsAuthenticating(false));
      return Promise.reject(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(authActions.logout());
    return Promise.resolve(true);
  };
};

export const signUpUser = (userData) => {
  return async (dispatch) => {
    const sendSignUp = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();
      return data;
    };

    dispatch(authActions.setIsAuthenticating(true));
    try {
      const res = await sendSignUp();
      dispatch(authActions.login(res));
      dispatch(authActions.setIsAuthenticating(false));
      return Promise.resolve(true);
    } catch (err) {
      dispatch(authActions.setIsAuthenticating(false));
      return Promise.reject(err);
    }
  };
};
