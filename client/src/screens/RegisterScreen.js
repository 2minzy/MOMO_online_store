import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h2>Sign Up</h2>
      {message && (
        <div className='error'>
          <Message>{message}</Message>
        </div>
      )}
      {error && (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      )}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className='form__content'>
          <div>Name</div>
          <input
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
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

        <div className='form__content'>
          <div>Confirm Password</div>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className='btn'>REGISTER</button>
      </form>

      <div>
        Have an Account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          LOGIN
        </Link>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
