import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message>{error}</Message>}
      {loading && (
        <div className='loading'>
          <Loader />
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className='form__content'>
          <div>Email Address</div>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='form__content'>
          <div>Password</div>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className='btn'>SIGN IN</button>
      </form>

      <div>
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          REGISTER
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
