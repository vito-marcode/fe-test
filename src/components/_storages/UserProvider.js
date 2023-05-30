import React, { useEffect, useState } from "react"
import UserContext from "./UserContext"


const UserProvider = ({ children }) => {

  function getInitialState() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  const [user, setUser] = useState(getInitialState)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
     setUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: currentValue => {
          setUser(currentValue)
        },
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider