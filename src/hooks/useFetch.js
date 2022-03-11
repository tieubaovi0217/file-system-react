// import { useEffect, useState } from 'react';

// const useFetch = (url, initialData = null) => {
//   const [data, setData] = useState(initialData);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(url)
//       .then((res) => res.json())
//       .then(setData)
//       .catch(setError)
//       .finally(() => setIsLoading(false));
//   }, [url]);

//   return {
//     data,
//     error,
//     isLoading,
//   };
// };

// export default useFetch;
