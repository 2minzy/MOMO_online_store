import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = product => {
    dispatch(createProduct());
  };

  return (
    <div className='container'>
      <h3 className='admin__list__title'>PRODUCTS</h3>
      <button className='btn' onClick={createProductHandler}>
        <i className='fas fa-plus'></i> CREATE PRODUCT
      </button>
      <div className='admin__list'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='error'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message className='error'>{errorCreate}</Message>}
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
    </div>
  );
};

export default ProductListScreen;
