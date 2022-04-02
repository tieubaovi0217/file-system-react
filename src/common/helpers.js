export const normalizeURL = (url) => {
  return url.replace(/([^:]\/)\/+/g, '$1');
};
