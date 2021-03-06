export const saveCredentialsToLocalStorage = ({ user, token }) => {
  // TODO should store token in cookie with httpOnly
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeCredentialsFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('currentPath');
};

export const saveContactInfoToLocalStorage = ({ phoneNumber, address }) => {
  const user = getUserFromLocalStorage();
  user.phoneNumber = phoneNumber;
  user.address = address;
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {};
};
