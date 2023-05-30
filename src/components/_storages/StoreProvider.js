import React from 'react';
import PropTypes from 'prop-types';
import StoreContext from './StoreContext';
import config from '../../config/config';
import useDataProvider from '../../hooks/useDataProvider';


const StoreProvider = ({ children }) => {
  const { error, isLoading, data } = useDataProvider({
    url: config.baseUrl + 'stores/' + config.idStore,
  });

  return (
    <StoreContext.Provider
      value={{
        data,
        isLoading,
        error
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  /** Content */
  children: PropTypes.node
};

StoreProvider.defaultProps = {};

export default StoreProvider;
