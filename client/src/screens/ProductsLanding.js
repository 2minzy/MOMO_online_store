import React, { useState, useEffect } from 'react'
import Product from '../components/Product';
import axios from 'axios';

const ProductsLanding = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="container">
    <div className="products__title">Latest Products</div>
    <div className="products" >
      {products.map((product)=>(
        <Product key={product._id} product={product} />
      ))}
    </div>
    </div>
  )
}

export default ProductsLanding
