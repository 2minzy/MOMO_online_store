import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';

const ProductsLanding = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const onClickHandler = userFilter => {
    setCategory(userFilter);
  };

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title='Shop | MOMO' />
      <div className='container'>
        <div>
          <ul className='productLanding__filter'>
            <li className='productLanding__filter__item'>
              <button onClick={() => onClickHandler('coats')}>
                COATS & JACKETS
              </button>
            </li>
            <li className='productLanding__filter__item'>
              <button onClick={() => onClickHandler('tops')}>TOPS</button>
            </li>
            <li className='productLanding__filter__item'>
              <button onClick={() => onClickHandler('dresses')}>DRESSES</button>
            </li>
            <li className='productLanding__filter__item'>
              <button onClick={() => onClickHandler('bottoms')}>BOTTOMS</button>
            </li>
          </ul>
        </div>
        <div className='productLanding__title'>
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
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </div>
    </>
  );
};

export default ProductsLanding;
