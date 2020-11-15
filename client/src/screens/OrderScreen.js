import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/congig/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <div className='loading'>
      <Loader />
    </div>
  ) : error ? (
    <div className='error'>
      <Message>(error)</Message>
    </div>
  ) : (
    <div className='container'>
      <h3>Order {order._id}</h3>
      <div className='order'>
        <div>
          <h3 className='order__title'>SHIPPING</h3>
          <div className='order__content'>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong> {order.user.name}
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.city}
            </p>
            {order.isDelivered ? (
              <div className='success'>
                <Message>Delivered on {order.deliveredAt}</Message>
              </div>
            ) : (
              <div className='error'>
                <Message>Not Delivered</Message>
              </div>
            )}
          </div>

          <h3 className='order__title'>PAYMENT METHOD</h3>
          <div className='order__content'>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className='success'>
                <Message>Paid on {order.paidAt}</Message>
              </div>
            ) : (
              <div className='error'>
                <Message>Not paid</Message>
              </div>
            )}
          </div>

          <div className='order__content'>
            <h3 className='order__title'>ORDER ITEMS</h3>
            {order.orderItems.length === 0 ? (
              <div className='error'>
                <Message>Order is empty</Message>
              </div>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
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
            <span>${order.itemsPrice}</span>
          </div>
          <div className='order__summary'>
            <span>
              <b>Shipping: </b>
            </span>
            <span>${order.shippingPrice}</span>
          </div>
          <div className='order__summary'>
            <span>
              <b>Tax: </b>
            </span>
            <span>${order.taxPrice}</span>
          </div>
          <div className='order__summary'>
            <span>
              <b>Total: </b>
            </span>
            <span>${order.totalPrice}</span>
          </div>
          <div className='order__paypal__btn'>
            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}
                <div>
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
