import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <FormContainer>
      <h3 className='user__list__title'>EDIT PRODUCT</h3>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <div className='error'>
          <Message>{errorUpdate}</Message>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <div className='form__content'>
            <div>Name</div>
            <input
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className='form__content'>
            <div>Price</div>
            <input
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div className='form__content'>
            <div>Image</div>
            <input
              type='text'
              placeholder='Enter image URL'
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <div className='form__content__upload'>
              <input type='file' onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </div>
          </div>

          <div className='form__content'>
            <div>Brand</div>
            <input
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
          </div>

          <div className='form__content'>
            <div>Count In Stock</div>
            <input
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={e => setCountInStock(e.target.value)}
            />
          </div>

          <div className='form__content'>
            <div>Category</div>
            <input
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <div className='form__content'>
            <div>Description</div>
            <input
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <button className='btn'>UPDATE</button>
        </form>
      )}
    </FormContainer>
  );
};

export default ProductEditScreen;
