import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import { NavLink } from 'react-router-dom';

const ProductsLanding = ({ match }) => {
  const category = match.params.category;

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

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
              <NavLink exact to='/shop' activeClassName='active'>
                ALL
              </NavLink>
            </li>
            <li className='productLanding__filter__item'>
              <NavLink to='/shop/category/coats' activeClassName='active'>
                COATS & JACKETS
              </NavLink>
            </li>
            <li className='productLanding__filter__item'>
              <NavLink to='/shop/category/tops' activeClassName='active'>
                TOPS
              </NavLink>
            </li>
            <li className='productLanding__filter__item'>
              <NavLink to='/shop/category/dresses' activeClassName='active'>
                DRESSES
              </NavLink>
            </li>
            <li className='productLanding__filter__item'>
              <NavLink to='/shop/category/bottoms' activeClassName='active'>
                BOTTOMS
              </NavLink>
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
        <Paginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
          category={category ? category : ''}
        />
      </div>
    </>
  );
};

export default ProductsLanding;
