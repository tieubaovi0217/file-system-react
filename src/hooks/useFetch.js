import { useCallback, useState } from 'react';

const useFetch = () => {
  const [isFetching, setIsFetching] = useState(false);

  const sendRequest = useCallback((url, input) => {
    return new Promise((resolve, reject) => {
      setIsFetching(true);

      // start to fetch
      fetch(url, input)
        .then((response) => {
          setIsFetching(false);
          if (response.ok) return response.json();

          // error
          return response.json().then((data) => {
            throw new Error(data.error || 'Failed to fetch');
          });
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          setIsFetching(false);
          reject(err);
        });
    });
  }, []);

  return {
    isFetching,
    sendRequest,
  };
};

export default useFetch;
