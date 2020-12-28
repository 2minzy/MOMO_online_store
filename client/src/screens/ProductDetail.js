import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductDetail = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Meta title={product.name} />
      <div className='container'>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <>
            <div className='productDeatil'>
              <div className='productDetail__box'>
                <img src={product.image} alt={product.name} />
              </div>
              <div className='description-box'>
                <div className='heading'>{product.name}</div>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <div> ${product.price} </div>
                <div className='description'>
                  DESCRIPTION: {product.description}
                </div>
                <div
                  className={`${
                    product.countInStock > 0 ? 'in-stock' : 'sold-out'
                  }`}
                >
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </div>
                {product.countInStock > 0 && (
                  <div className='quantity'>
                    <span>Qty</span>
                    <select
                      className='select'
                      value={qty}
                      onChange={e => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map(
                        (x, index) => (
                          <option key={index} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
                <button
                  className={`${
                    product.countInStock === 0 ? 'disabled' : 'btn'
                  }`}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className='productDetail__review'>
              <h3>REVIEWS</h3>
              {product.reviews.length === 0 && (
                <div className='error'>
                  <Message>No Reviews</Message>
                </div>
              )}
              <div>
                {product.reviews.map((review, index) => (
                  <div className='productDetail__review__container' key={index}>
                    <div className='productDetail__review__container__item'>
                      <strong>{review.name}</strong>
                    </div>
                    <div className='productDetail__review__container__item'>
                      <Rating value={review.rating} />
                    </div>
                    <div className='productDetail__review__container__item'>
                      {review.createdAt.substring(0, 10)}
                    </div>
                    <div className='productDetail__review__container__item__content'>
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className='productDetail__review__create'>
                <h3>WRITE A CUSTOMER REVIEW</h3>
                {errorProductReview && (
                  <div className='error'>
                    <Message>{errorProductReview}</Message>
                  </div>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className='form__content'>
                      <div>Rating</div>
                      <select
                        type='select'
                        placeholder='Enter name'
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </select>
                    </div>

                    <div className='form__content__comment'>
                      <div>Comment</div>
                      <textarea
                        onChange={e => setComment(e.target.value)}
                      ></textarea>
                    </div>

                    <button className='btn'>SUBMIT</button>
                  </form>
                ) : (
                  <Message>
                    Please <Link to='/login'>Sign In</Link> to write a review
                  </Message>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
