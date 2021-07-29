import { request } from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import domain from '../../domain/domain';
import './Navbar.scss';
const Navbar = () => {
  const { user, getUser } = useContext(UserContext);
  const logout = () => {
    request({
      url: `${domain}/auth/logout`,
      method: 'GET',
    }).then(() => {
      getUser();
    });
  };
  return (
    <div className='navbar'>
      <h1>
        <Link to='/'>Snippet manager</Link>
      </h1>
      {user === null ? (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </>
      ) : (
        user && (
          <button className='btn-logout' onClick={logout}>
            Logout
          </button>
        )
      )}
    </div>
  );
};

export default Navbar;
