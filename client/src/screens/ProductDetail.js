import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating'
import axios from 'axios';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async() => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [match])

  return (
    <div className="container productDeatil">
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
  )
}

export default ProductDetail
