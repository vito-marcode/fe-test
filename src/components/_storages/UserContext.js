import * as React from 'react';

const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {}
});
UserContext.displayName = 'Context__UserContext';

export default UserContext; 