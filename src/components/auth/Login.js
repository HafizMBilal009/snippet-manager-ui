import { request } from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import domain from '../../domain/domain';
import ErrorMessage from '../misc/ErrorMessage';
import Loader from '../misc/Loader';
import './AuthForm.scss';
const Login = () => {
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const { getUser } = useContext(UserContext);
  const { push } = useHistory();
  const login = (e) => {
    e.preventDefault();
    setIsLoaderVisible(true);
    request({
      method: 'POST',
      url: `${domain}/auth/login`,
      data: {
        email: formEmail,
        passwordHash: formPassword,
      },
    })
      .then(() => {
        setIsLoaderVisible(false);
        getUser();
        push('/');
      })
      .catch(
        ({
          response: {
            data: { errorMessage },
          },
        }) => {
          setIsLoaderVisible(false);
          setErrorMessage(errorMessage);
        }
      );
  };
  return (
    <div className='auth-form'>
      <h2>Log in</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className='form' onSubmit={login}>
        <label htmlFor='form-email'>Email</label>
        <input
          type='email'
          id='form-email'
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label htmlFor='form-password'>Password</label>
        <input
          type='password'
          id='form-password'
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />

        {isLoaderVisible ? (
          <Loader />
        ) : (
          <button className='btn-submit' type='submit'>
            Log in
          </button>
        )}
      </form>
      <p>
        Don't have an account yet? <Link to='/signup'>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
