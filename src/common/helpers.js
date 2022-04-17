export const normalizeURL = (url) => {
  return url.replace(/([^:]\/)\/+/g, '$1');
};

export const getRemotePath = (username, path) => {
  return normalizeURL(`/root/${username}/${path}`);
};

export const truncateFileName = (name) => {
  return `${name.substring(0, 16)}${name.length > 16 ? '...' : ''}`;
};
