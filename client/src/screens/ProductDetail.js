import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  return (
    <div className="container">
      {loading ? <Loader /> : error ? <Message>{error}</Message> : (
        <div className="productDeatil">
          <div><img src={product.image} alt={product.name} /></div>
          <div className="description-box">
            <div className="heading">{product.name}</div>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <div> ${product.price} </div>
            <div className="description">DESCRIPTION: {product.description}</div>
            <div className={`quantity ${product.countInStock > 0 ? 'in-stock' : 'sold-out'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</div>
            <button className={`${product.countInStock === 0 ? 'disabled' : 'btn'}`}>
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
