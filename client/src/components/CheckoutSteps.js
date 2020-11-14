import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='form__checkout__nav'>
      <span className='form__checkout__nav__item'>
        {step1 ? (
          <Link to='/login'>Sign In</Link>
        ) : (
          <a href='/login' className='form__checkout__nav__disabled'>
            Sign In
          </a>
        )}
      </span>
      <span className='form__checkout__nav__item'>
        {step2 ? (
          <Link to='/shipping'>Shipping</Link>
        ) : (
          <a href='/shipping' className='form__checkout__nav__disabled'>
            Shipping
          </a>
        )}
      </span>
      <span className='form__checkout__nav__item'>
        {step3 ? (
          <Link to='/payment'>Payment</Link>
        ) : (
          <a href='/payment' className='form__checkout__nav__disabled'>
            Payment
          </a>
        )}
      </span>
      <span className='form__checkout__nav__item'>
        {step4 ? (
          <Link to='/placeorder'>Plcae Order</Link>
        ) : (
          <a href='/payment' className='form__checkout__nav__disabled'>
            Place Order
          </a>
        )}
      </span>
    </div>
  );
};

export default CheckoutSteps;
