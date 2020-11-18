import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  // loaction.search is in the end of the api address of cart page 'qty?1'
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className='container'>
      <p className='page__title'>SHOPPING CART ITEMS</p>
      {cartItems.length === 0 ? (
        <div className='error'>
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.product} className='conatiner cart__container'>
              <img src={item.image} alt={item.name} />
              <div className='cart__name'>
                <Link to={`/shop/product/${item.product}`}>{item.name}</Link>
              </div>
              <div>${item.price}</div>
              <div>
                <select
                  className='select'
                  value={item.qty}
                  onChange={e =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  className='btn'
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
          <div className='conatiner cart__description'>
            <p>
              Order quantity:{' '}
              {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
            </p>
            <p>Delivery: FREE</p>
            <p className='cart__total'>
              TOTAL: $
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </p>
            <button
              className={`${cartItems.length === 0 ? 'disabled' : 'btn'}`}
              onClick={checkoutHandler}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
