const express = require("express");
const receiptsRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  createReceipt,
  getAllReceipts,
  getReceiptsByName,
  updateCart
} = require("../db");

receiptsRouter.get("/", async (req, res) => {
  // console.log("request to orders");
  const receipts = await getAllReceipts();

  res.send({
    receipts,
  });
});

receiptsRouter.post("/myReceipts", async (req, res) => {
  const { username } = req.body
  try {
    console.log(username)
    const receipts = await getReceiptsByName(username);

  res.send({
    receipts,
  });
  } catch (error) {
    throw error;
  }
});

receiptsRouter.post("/checkout", async (req, res, next) => {
   console.log(req.body);
  const { id } = req.body
  try {
    const receipts = await createReceipt(req.body);
    const cart = await updateCart('[]', id)
  res.send({
    receipts,
    cart,
  });
  } catch (error) {
    next(error);
  }
});

module.exports = receiptsRouter;
