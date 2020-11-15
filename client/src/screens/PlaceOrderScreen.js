import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  // Calculate prices
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = 0;
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className='container'>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='order'>
        <div>
          <h3 className='order__title'>SHIPPING</h3>
          <p className='order__content'>
            <strong>Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}
          </p>

          <h3 className='order__title'>PAYMENT METHOD</h3>
          <p className='order__content'>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </p>

          <div className='order__content'>
            <h3 className='order__title'>ORDER ITEMS</h3>
            {cart.cartItems.length === 0 ? (
              <div className='error'>
                <Message>Your cart is empty</Message>
              </div>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className='order__content__container'>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className='order__content__container__name'>
                      <Link to={`/product/${item.product}`}> {item.name}</Link>
                    </div>
                    <div>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className='order__summary__title'>ORDER SUMMARY</h3>
          <div className='order__summary'>
            <span>
              <b>Items: </b>
            </span>
            <span>${cart.itemsPrice}</span>
          </div>
          <div className='order__summary'>
            <span>
              <b>Shipping: </b>
            </span>
            <span>${cart.shippingPrice}</span>
          </div>
          <div className='order__summary'>
            <span>
              <b>Tax: </b>
            </span>
            <span>${cart.taxPrice}</span>
          </div>
          <div className='order__summary'>
            <span>
              <b>Total: </b>
            </span>
            <span>${cart.totalPrice}</span>
          </div>
          {error && (
            <div className='error'>
              <Message>(error)</Message>
            </div>
          )}
          <button
            className={`${cart.cartItems === 0 ? 'disabled' : 'btn'}`}
            onClick={placeOrderHandler}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
