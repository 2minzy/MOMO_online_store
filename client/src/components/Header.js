import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <header>
        <nav className='nav'>
          <div className='nav__logo'>
            <Link to='/'>MOMO</Link>
          </div>
          <ul className='nav__items'>
            <li>
              <Link to='/shop'>SHOP</Link>
            </li>
            <li>
              <Link to='/cart'>CART</Link>
            </li>
            {userInfo ? (
              <li className='dropdown'>
                <div className='dropdown__profile'>
                  {userInfo.name}
                  <i className='fa fa-caret-down'></i>
                </div>
                <div className='dropdown__content'>
                  <div className='dropdown__content__profile'>
                    <Link to='/profile'>Profile</Link>
                  </div>
                  <div
                    onClick={logoutHandler}
                    className='dropdown__content__logout'
                  >
                    Logout
                  </div>
                </div>
              </li>
            ) : (
              <li>
                <Link to='/login'>SIGN IN</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
