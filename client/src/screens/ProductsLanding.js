import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';

const ProductsLanding = ({ match }) => {
  const [category, setCategory] = useState('');

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const onClickHandler = userFilter => {
    setCategory(userFilter);
  };

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  return (
    <>
      <Meta title='Shop | MOMO' />
      <div className='container'>
        <div>
          <ul className='productLanding__filter'>
            <li className='productLanding__filter__item'>
              <button
                onClick={() => onClickHandler('')}
                className={`${category === '' ? 'active' : ''}`}
              >
                ALL
              </button>
            </li>
            <li className='productLanding__filter__item'>
              <button
                onClick={() => onClickHandler('coats')}
                className={`${category === 'coats' ? 'active' : ''}`}
              >
                COATS & JACKETS
              </button>
            </li>
            <li className='productLanding__filter__item'>
              <button
                onClick={() => onClickHandler('tops')}
                className={`${category === 'tops' ? 'active' : ''}`}
              >
                TOPS
              </button>
            </li>
            <li className='productLanding__filter__item'>
              <button
                onClick={() => onClickHandler('dresses')}
                className={`${category === 'dresses' ? 'active' : ''}`}
              >
                DRESSES
              </button>
            </li>
            <li className='productLanding__filter__item'>
              <button
                onClick={() => onClickHandler('bottoms')}
                className={`${category === 'bottoms' ? 'active' : ''}`}
              >
                BOTTOMS
              </button>
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
