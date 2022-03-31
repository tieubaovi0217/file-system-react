export const normalizeRelativePath = (path) => {
  return path.replace('\\', '/');
};

export const normalizeURL = (url) => {
  return url.replace(/(?!https:\/\/)(?!http:\/\/)\/\//g, '/');
};
