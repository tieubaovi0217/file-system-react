import { message } from 'antd';
import { useState } from 'react';

const useFetch = () => {
  const [isFetching, setIsFetching] = useState(false);

  const sendRequest = (url, data, callback) => {
    setIsFetching(true);
    // start to fetch
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsFetching(false);
        if (response.ok) return response.json();
        // error

        return response.json().then((data) => {
          throw new Error(data.error || 'Failed to fetch');
        });
      })
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err);
        message.error(err.message, 1);
      });
  };

  return {
    isFetching,
    sendRequest,
  };
};

export default useFetch;
