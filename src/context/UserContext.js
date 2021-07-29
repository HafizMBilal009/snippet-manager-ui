import { request } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import domain from '../domain/domain';
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const getUser = () =>
    request({
      url: `${domain}/auth/loggedIn`,
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
