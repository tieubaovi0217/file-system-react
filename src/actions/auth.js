import { authActions } from 'slices/auth';

export const loginUserAsync = (userData) => {
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

    try {
      const { token, user } = await sendLogin();
      dispatch(authActions.login({ token, user }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve({ token, user });
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentPath');
    return Promise.resolve(true);
  };
};

export const signUpUserAsync = (userData) => {
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

      const { token, user } = await res.json();
      return { token, user };
    };

    try {
      const { token, user } = await sendSignUp();
      dispatch(authActions.login({ token, user }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve({ token, user });
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
