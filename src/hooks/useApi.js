// import { useReducer } from 'react';

// const initialState = {
//   status: 'idle',
//   error: null,
//   data: [],
// };

// const apiReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCHING':
//       return { ...initialState, status: 'fetching' };
//     case 'FETCHED':
//       return { ...initialState, status: 'fetched', data: action.payload };
//     case 'FETCH_ERROR':
//       return { ...initialState, status: 'error', error: action.payload };
//     default:
//       return state;
//   }
// };

// const useApi = () => {
//   const [state, dispatch] = useReducer(apiReducer, initialState);
//   let cancelRequest = false;

//   useEffect(() => {
//     const fetchData = async () => {};
//   }, []);
// };

// export default useApi;
