import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  getProductWithId,
  getMeWithName,
  updateMyCart,
  addReview
} from "../api";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

const SingleProductPage = ({ isSeller, person }) => {
  const { productsId } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getProductWithId(productsId)
      .then((x) => {
        setProducts(x.product);
        setReviews(x.product.reviews);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getMeWithName(getUser())
      .then((x) => {
        setCart(x.me.cart);
        setName(x.me.username);
        setId(x.me.id);
        setPrice(x.me.currentprice);
      })
      .catch(console.error);
  }, []);

  async function updateCart(cart, named) {
    const found = ({ name }) => name === named;
    let i = cart.findIndex(found);
    if (i === -1) {
      cart.push({
        id: products.id,
        name: products.name,
        price: products.price,
        seller: products.seller,
        category: products.category,
        quantity: 1,
        description: products.product.description
      });
      let string = JSON.stringify(cart);
      await updateMyCart(string, price + products.price, id);
    } else {
      let x = cart[i].price / cart[i].quantity;
      cart[i].quantity = cart[i].quantity + 1;
      cart[i].price = x * cart[i].quantity;
      let string = JSON.stringify(cart);
      await updateMyCart(string, price + x, id);
    }
  }

  return (
    <div className="posts-main-container">
      <h1>{products.name}</h1>
      <img src={products.picture} alt="product"></img>
      <h3>{products.price / 100}G</h3>
      <h3>{products.description}</h3>
      <button
        onClick={async () => {
          if (isSeller === true || person === "administrator"  || name === "") {
            alert("Sign in as a user to shop!");
          } else {
            await updateCart(cart, products.name);
          }
        }}
      >
        Add to Cart
      </button>

      <h4>
        Sold By:{" "}
        <Link to={`/sellers/${products.seller}`}>{products.seller}</Link>
      </h4>
      {reviews.map((x) => {
        return (
          <div key={x.user}>
            <p>{x.date}</p>
            <p>{x.rating} Stars</p>
            <p>"{x.message}"</p>
            <p>Reviewed by {x.user}</p>
          </div>
        );
      })}
      <form
        id="newPostSubmit"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            let a = {
              message: review,
              rating: rating,
              date: "1/12/22",
              user: name
            };
            reviews.push(a);
            let ob = JSON.stringify(reviews);
            await addReview(ob, products.id);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <h2>Add Review</h2>
        <fieldset className="auth-component-input">
          <label htmlFor="rating">Rating:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter a number 0-5"
            value={rating}
            onChange={(event) => {
              setRating(event.target.value);
            }}
          ></input>
        </fieldset>
        <fieldset className="auth-component-input">
          <label htmlFor="review">Review:</label>
          <input
            id="description"
            type="text"
            placeholder="Review away!"
            value={review}
            onChange={(event) => {
              setReview(event.target.value);
            }}
          ></input>
        </fieldset>
        <button typeof="submit">Submit</button>
      </form>
    </div>
  );
};

export default SingleProductPage;
