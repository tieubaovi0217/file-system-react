import axios from 'axios';
import { useReducer, useCallback } from 'react';

import { useIsMounted } from './useIsMounted';

const initialState = {
  status: 'idle',
  error: null,
  response: null,
};

const ACTIONS = {
  STARTED: 'STARTED',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const axiosReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.STARTED:
      return {
        ...initialState,
        status: 'pending',
      };
    case ACTIONS.SUCCESS:
      return {
        ...initialState,
        status: 'resolved',
        response: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...initialState,
        status: 'rejected',
        error: action.payload,
      };
    default:
      return state;
  }
};

/**
 *
 * @param {} method lower case string
 * @returns
 */
const useAxios = (baseURL) => {
  const [state, dispatch] = useReducer(axiosReducer, initialState);

  const isMounted = useIsMounted();

  const fetchData = useCallback(async ({ path, headers = null }) => {
    dispatch({ type: ACTIONS.STARTED });
    try {
      const axiosInstance = axios.create({ baseURL, headers });
      const resp = await axiosInstance.get(path);
      isMounted.current &&
        dispatch({ type: ACTIONS.SUCCESS, payload: resp.data });
    } catch (error) {
      isMounted.current && dispatch({ type: ACTIONS.ERROR, payload: error });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    isLoading: state.status === 'idle' || state.status === 'pending',
    isIdle: state.status === 'idle',
    isPending: state.status === 'pending',
    isResolved: state.status === 'resolved',
    isRejected: state.status === 'rejected',
    fetchData,
  };
};

export default useAxios;
