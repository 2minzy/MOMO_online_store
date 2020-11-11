import React, { userState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, userSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { useState } from 'react';

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = e => {
    e.preventDefault();
    // DISPATCH LOGIN
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className='email__form'>
          <div>Email Address</div>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='password__form'>
          <div>Password</div>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button>Sign In</button>
      </form>

      <div>
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
