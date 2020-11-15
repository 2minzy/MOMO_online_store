import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';

const ProductsLanding = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className='container'>
      <div className='page__title'>
        LATEST PRODUCTS
        <br />
        20% OFF ALL TOPS & DRESS
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      ) : (
        <div className='products'>
          {products.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsLanding;
