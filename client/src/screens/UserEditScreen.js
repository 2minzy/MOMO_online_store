import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <FormContainer>
      <h3 className='admin__list__title'>EDIT USER</h3>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <div className='error'>
          <Message>{errorUpdate}</Message>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      ) : (
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
            <div>Is Admin</div>
            <input
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              className='form__content__checkbox'
              onChange={e => setIsAdmin(e.target.checked)}
            />
          </div>

          <button className='btn'>UPDATE</button>
        </form>
      )}
    </FormContainer>
  );
};

export default UserEditScreen;
