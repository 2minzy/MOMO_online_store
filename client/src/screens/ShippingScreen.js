import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import Meta from '../components/Meta';

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  // '' for initial controll, It will show error without '' due to initially uncontrolled input
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <Meta title='Shipping Info | MOMO' />
      <CheckoutSteps step1 step2 />
      <h3 className='form__title'>SHIPPING</h3>
      <form onSubmit={submitHandler}>
        <div className='form__content'>
          <div>Address</div>
          <input
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className='form__content'>
          <div>City</div>
          <input
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>
        <div className='form__content'>
          <div>Postal Code</div>
          <input
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
        </div>
        <div className='form__content'>
          <div>Country</div>
          <input
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </div>
        <button className='btn'>CONTINUE</button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
