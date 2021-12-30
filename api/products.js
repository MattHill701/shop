const express = require("express");
const productsRouter = express.Router();
const jwt = require("jsonwebtoken");

const { 
  createProduct,
  getProductsByName,
  getAllProducts,
  deleteProduct,
  updateProduct,
  updateProductAdmin,
  getProductsByCategory,
  getProductsBySeller,
  getProductsByPriceRange,
  addReview
  } = require("../db");

productsRouter.get("/", async (req, res) => {
  console.log("request to products");
  const products = await getAllProducts();

  res.send({
    products,
  });
});

productsRouter.delete("/", async (req, res, next) => {

  const { id } = req.body

  try{
  const product = await deleteProduct(id);

  res.send({
    product, 
  });
} catch (error){
  next(error);
}
});

productsRouter.post("/", async (req, res, next) => {
  try{
  const product = await createProduct(req.body);

  res.send({
    product, 
  });
} catch (error){
  next(error);
}
});

productsRouter.patch("/", async (req, res, next) => {

  const { id, name, description, price, category, inventory, picture } = req.body

  try{
  const product = await updateProduct( id, name, description, price, category, inventory, picture );

  res.send({
    product,
  });
} catch (error){
  next(error);
}
});

productsRouter.patch("/admin", async (req, res, next) => {

  const { id, name, description, price, category, inventory, picture, reviews } = req.body

  try{
  const product = await updateProductAdmin( id, name, description, price, category, inventory, picture, reviews );

  res.send({
    product,
  });
} catch (error){
  next(error);
}
});

productsRouter.post("/reviews", async (req, res, next) => {
  const { object, id } = req.body
  try{
  const reviews = await addReview(object, id);
  res.send({
    reviews,
  });
} catch(error){
  next(error)
}
});

productsRouter.post("/name", async (req, res, next) => {
  const { name } = req.body
  try{
  const product = await getProductsByName(name);
  res.send({
    product,
  });
} catch(error){
  next(error)
}
});

productsRouter.post("/seller", async (req, res, next) => {
  const { seller } = req.body
  try{
  const product = await getProductsBySeller(seller);
  res.send({
    product,
  });
} catch(error){
  next(error)
}
});

productsRouter.post("/category", async (req, res, next) => {
  const { category } = req.body
  try{
  const product = await getProductsByCategory(category);
  res.send({
    product,
  });
} catch(error){
  next(error)
}
});

productsRouter.post("/price", async (req, res, next) => {
  const { low, high } = req.body
  try{
  const product = await getProductsByPriceRange(low, high);
  res.send({
    product,
  });
} catch(error){
  next(error)
}
});


module.exports = productsRouter;
