import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='form__checkout__nav'>
      <span>
        {step1 ? (
          <Link to='/login'>Sign In</Link>
        ) : (
          <a href='/login' className='disabled'>
            Sign In
          </a>
        )}
      </span>
      <span>
        {step2 ? (
          <Link to='/shipping'>Shipping</Link>
        ) : (
          <a href='/shipping' className='disabled'>
            Shipping
          </a>
        )}
      </span>
      <span>
        {step3 ? (
          <Link to='/payment'>Payment</Link>
        ) : (
          <a href='/payment' className='disabled'>
            Payment
          </a>
        )}
      </span>
      <span>
        {step4 ? (
          <Link to='/placeorder'>Plcae Order</Link>
        ) : (
          <a href='/payment' className='disabled'>
            Place Order
          </a>
        )}
      </span>
    </div>
  );
};

export default CheckoutSteps;
