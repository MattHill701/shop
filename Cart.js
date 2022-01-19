import React, { useState, useEffect } from "react";
import { getMeWithName, updateMyCart, checkOut } from "../api";
import { getUser, getToken } from "../auth";
import StripeCheckout from "react-stripe-checkout";

const Cart = ({ name }) => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    getMeWithName(getUser())
      .then((x) => {
        setCart(x.me.cart);
        setId(x.me.id);
        setPrice(x.me.currentprice);
      })
      .catch(console.error);
  }, []);

  async function updateCart(cart, named, add) {
    const found = ({ name }) => name === named;
    let i = cart.findIndex(found);
    let x;
    if (add) {
      x = cart[i].price / cart[i].quantity;
      cart[i].quantity = cart[i].quantity + 1;
      cart[i].price = x * cart[i].quantity;
    } else {
      x = cart[i].price / cart[i].quantity;
      cart[i].quantity = cart[i].quantity - 1;
      if (cart[i].quantity === 0) {
        cart.splice(i, 1);
      } else {
        cart[i].price = x * cart[i].quantity;
      }
    }
    let string = JSON.stringify(cart);
    await updateMyCart(string, price + x, id);
  }

  return (
    <div className="posts-main-container">
      <h1>Cart</h1>
      {cart.map((x) => {
        return (
          <div key={x.id}>
            <h3>
              {x.name} x {x.quantity}
            </h3>
            <p>{x.price / 100}G</p>
            <button
              onClick={async () => {
                await updateCart(cart, x.name, true);
              }}
            >
              +
            </button>
            <button
              onClick={async () => {
                await updateCart(cart, x.name, false);
              }}
            >
              -
            </button>
          </div>
        );
      })}
      <h2>Total: {price / 100}G</h2>
      <StripeCheckout token={getToken} stripeKey="my_PUBLISHABLE_stripekey" />
      <button
        onClick={async () => {
          await checkOut(name, JSON.stringify(cart), price, "1/14/22", id);
        }}
      >
        The Checkout button that doesn't steal your credit card
      </button>
    </div>
  );
};

export default Cart;
