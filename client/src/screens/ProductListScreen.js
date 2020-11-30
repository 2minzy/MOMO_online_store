import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct } from '../actions/productActions';
import Meta from '../components/Meta';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(listProducts('', '', pageNumber));
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className='container'>
      <Meta title='Products List | ADMIN PAGE' />
      <h3 className='admin__list__title'>PRODUCTS</h3>

      <Link to='/admin/product/create' className='btn'>
        <i className='fas fa-plus'></i> CREATE PRODUCT
      </Link>

      <div className='admin__list'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='error'>{errorDelete}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <table className='admin__list__table'>
            <thead>
              <tr>
                <th>NO.</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td className='admin__list__btn'>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className='btn admin__list__edit'>
                          <i className='fas fa-edit'></i>
                        </button>
                      </Link>
                      <button
                        className='btn'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <Paginate pages={pages} page={page} isAdmin={true} />
      </div>
    </div>
  );
};

export default ProductListScreen;
