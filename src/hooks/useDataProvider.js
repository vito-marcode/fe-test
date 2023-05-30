import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Hook, used for receiving actual data for passed params.
 */
function useDataProvider({
  url,
  headers,
  requestType,
  params,
  // To prevent call and maintain same data
  preventCall,
}) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof url !== 'string') setError(new TypeError('Url is not a string type'));
    else setError(null);
  }, [url]);

  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    let request = null;
    if (preventCall) {
      request = Promise.resolve(null);
    } else if (requestType === "post") {
      request = axios.post(url, params, { headers });
    } else if (requestType === "put") {
      request = axios.put(url, { params });
    } else {
      request = axios.get(url, { params });
    }

    request
      .then((newData) => {
        if (!preventCall && isMounted) {
          setData(newData.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setData(null);
        console.error(err);
        setError(true);
      })
      .then(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [headers, params, preventCall, requestType, url]);

  return React.useMemo(
    () => ({ data, isLoading, error }),
    [data, isLoading, error],
  );
}

useDataProvider.propTypes = {
  /** Endpoint to call to */
  url: PropTypes.string.isRequired,
  /** Type of the request */
  requestType: PropTypes.oneOf(['get', 'post', 'put']),
  /** Params to pass into request */
  params: PropTypes.shape({}),
  /** Headers object to pass into request */
  headers: PropTypes.shape({}),
  /** Flag, while truthy - request will not be done,
   * to prevent call and provide same, old data */
  preventCall: PropTypes.bool,
  /**
   * Function to extract chunk of data from RestAPI response. Remember to wrap in useCallback
   * Example:
   *    React.useCallback((response) => response && response.data && response.data.content, []);
   */
};

useDataProvider.defaultProps = {
  requestType: 'get',
  headers: null,
};

export default useDataProvider;
