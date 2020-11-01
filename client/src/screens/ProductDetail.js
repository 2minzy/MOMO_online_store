import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductDetail = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

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
            <div className={`${product.countInStock > 0 ? 'in-stock' : 'sold-out'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</div>
              {product.countInStock > 0 && (
                <div className="quantity">
                  <span>Qty</span>
                  <select 
                  className="select" 
                  value={qty} 
                  onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
              )}  
            <button 
            className={`${product.countInStock === 0 ? 'disabled' : 'btn'}`}
            onClick={addToCartHandler}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
