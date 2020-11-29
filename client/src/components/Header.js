import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <header>
        <nav className={location.pathname === '/' ? 'nav nav--dark' : 'nav'}>
          <div className='nav__logo'>
            <Link to='/'>MOMO</Link>
          </div>

          <ul className='nav__items'>
            <li>
              <Link to='/shop/search'>
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </li>
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
                  <div className='dropdown__content__item'>
                    <Link to='/profile'>Profile</Link>
                  </div>
                  <div
                    onClick={logoutHandler}
                    className='dropdown__content__item'
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

            {userInfo && userInfo.isAdmin && (
              <li className='dropdown'>
                <div className='dropdown__profile'>
                  ADMIN
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className='dropdown__content'>
                  <div className='dropdown__content__item'>
                    <Link to='/admin/userlist'>Users</Link>
                  </div>
                  <div className='dropdown__content__item'>
                    <Link to='/admin/productlist'>Products</Link>
                  </div>
                  <div className='dropdown__content__item'>
                    <Link to='/admin/orderlist'>Orders</Link>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
