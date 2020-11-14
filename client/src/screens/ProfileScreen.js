import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className='container form'>
      <div>
        <h2>User Profile</h2>
        {message && <Message>{message}</Message>}
        {error && <Message>{error}</Message>}
        {success && <Message>Profile Updated</Message>}
        {loading && (
          <div className='loading'>
            <Loader />
          </div>
        )}
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
          <button className='btn'>UPDATE</button>
        </form>
      </div>
      <div>
        <h2 className='form__title'>My Orders</h2>
      </div>
    </div>
  );
};

export default ProfileScreen;
