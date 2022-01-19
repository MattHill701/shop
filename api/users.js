const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET="neverTell" } = process.env
const { client, createUser, getUserByUsername, getAllUsers, getUserById, updateCart } = require("../db");

// UPDATE
usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await getAllUsers();


  res.send({
    users, 
  });
});

usersRouter.patch("/myCart", async (req, res, next) => {
  console.log("request to users");
  const { cart, currentprice, id } = req.body
  try{
  const myCart = await updateCart(cart, currentprice, id);

  res.send({
    myCart, 
  });
} catch (error){
  next(error)
}
});

usersRouter.post("/myId", async (req, res, next) => {
  console.log("request to users");
  const { id } = req.body
  try{
  const me = await getUserById(id);

  res.send({
    me, 
  });
} catch (error){
  next(error)
}
});

usersRouter.post("/myName", async (req, res, next) => {
  console.log("request to users");
  const { username } = req.body
  try{
  const me = await getUserByUsername(username);

  res.send({
    me, 
  });
} catch (error){
  next(error)
}
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, cart, currentprice } = req.body;
// console.log("api req.body",username, password, cart, canSell)
  try {
    let notUser = await getUserByUsername(username)
    if(notUser !== undefined){
      res.send("user exists")
    } else{
    let user = await createUser({username, password, cart, currentprice})
    console.log("this is user", user)

    const token = jwt.sign(
      {
        id: user.id,
        username: username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    console.log("this is token",token)
    res.send({message: "congrats", username, token})
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
    
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);
    if(user.username === username && user.password === password){
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      const userId = user.id;
      // console.log(userId)
      // console.log("this is token", token)
      res.send({username, userId, token})
    } else{
      res.send("error, whoopsie daisies!")
    }

  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
