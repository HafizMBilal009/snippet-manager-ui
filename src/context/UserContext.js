import { request } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const getUser = () =>
    request({
      url: 'http://localhost:5000/auth/loggedIn',
      method: 'GET',
    })
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => setUser(null));

  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
export { UserContextProvider };
