import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description    Fetch all products
// @route    GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //{} means find all products
  res.json(products);
});

// @description    Fetch single product
// @route    GET /api/products/.id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // findById means find specific product coz _id is unique

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
