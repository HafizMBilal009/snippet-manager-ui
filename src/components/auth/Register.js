import { request } from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import domain from '../../domain/domain';
import ErrorMessage from '../misc/ErrorMessage';
import './AuthForm.scss';

const Register = () => {
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formVerifyPassword, setFormVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const { push } = useHistory();

  const registerUser = (e) => {
    e.preventDefault();
    request({
      method: 'POST',
      url: `${domain}/auth`,
      data: {
        email: formEmail,
        passwordHash: formPassword,
        passwordVerify: formVerifyPassword,
      },
    })
      .then(() => {
        getUser();
        push('/');
      })
      .catch(
        ({
          response: {
            data: { errorMessage },
          },
        }) => {
          setErrorMessage(errorMessage);
        }
      );
  };
  return (
    <div className='auth-form'>
      <h2>Register a new account</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className='form' onSubmit={registerUser}>
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
        <label htmlFor='form-verify-password'>Verify Password</label>
        <input
          type='password'
          id='form-verify-password'
          value={formVerifyPassword}
          onChange={(e) => setFormVerifyPassword(e.target.value)}
        />
        <button className='btn-submit' type='submit'>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login instead</Link>
      </p>
    </div>
  );
};

export default Register;
