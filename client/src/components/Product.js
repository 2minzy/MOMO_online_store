import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Link className="product" to={`/shop/product/${product._id}`}>
      <img src={product.image} alt="product_image" />
      <div>{product.name}</div>
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      ${product.price}
    </Link>
  )
}

export default Product
