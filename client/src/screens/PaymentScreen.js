import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import Meta from '../components/Meta';

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <div className='container'>
      <Meta title='Payment Info | MOMO' />
      <CheckoutSteps step1 step2 step3 />
      <h3 className='form__title'>PAYMENT METHOD</h3>
      <form onSubmit={submitHandler}>
        <h3 className='form__content'>Select Method</h3>

        <div className='form__checkout__content'>
          <input
            type='radio'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='PayPal'> PayPal or Credit Card</label>
        </div>

        {/* <div className='form__checkout'>
          <input
            type='radio'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='Stripe'> Stripe</label>
        </div> */}
        <button className='btn form__btn'>CONTINUE</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
