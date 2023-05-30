import * as React from 'react';

const StoreContext = React.createContext({
  data: null,  
  isLoading: false,
  error: null,
});
StoreContext.displayName = 'Context__StoreContext';

export default StoreContext;