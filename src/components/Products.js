import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  getProductWithName,
  getMeWithName,
  updateMyCart
} from "../api";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

const Products = ({ isSeller, name }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [who, setWho] = useState("");
  const [id, setId] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getAllProducts()
      .then((x) => {
        setProducts(x.products);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getMeWithName(getUser())
      .then((x) => {
        if (x !== null) {
          setCart(x.me.cart);
          setId(x.me.id);
          setPrice(x.me.currentprice);
        }
      })
      .catch(console.error);
  }, []);

  async function updateCart(cart, named) {
    const found = ({ name }) => name === named;
    let i = cart.findIndex(found);
    if (i === -1) {
      let pro = await getProductWithName(named);
      cart.push({
        id: pro.product.id,
        name: pro.product.name,
        price: pro.product.price,
        seller: pro.product.seller,
        category: pro.product.category,
        quantity: 1,
        description: pro.product.description
      });
      let string = JSON.stringify(cart);
      await updateMyCart(string, price + pro.product.price, id);
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
      <h1>Products</h1>
      <h4>Category: </h4>
      <select
        onChange={(e) => {
          setWho(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="Drink">Drink</option>
        <option value="Sweets">Sweets</option>
        <option value="Sandwich">Sandwich</option>
        <option value="Other">Other</option>
      </select>
      {products.map((x) => {
        if (who === "" || who === "all") {
          return (
            <div className="pro" key={x.id}>
              <img className="pic" src={x.picture} alt="product"></img>
              <Link to={`/products/${x.id}`}>
                <h3>{x.name}</h3>
              </Link>
              <h4>Price: {x.price / 100}</h4>
              <button
                onClick={async () => {
                  if (isSeller === true || name === "administrator" || name === "") {
                    alert("Sign in as a user to shop!");
                  } else {
                    await updateCart(cart, x.name);
                  }
                }}
              >
                Add to Cart
              </button>

              <h4>
                Sold By: <Link to={`/sellers/${x.seller}`}>{x.seller}</Link>
              </h4>
            </div>
          );
        } else {
          if (x.category === who) {
            return (
              <div key={x.id}>
                <img src={x.picture} alt="product"></img>
                <Link to={`/products/${x.id}`}>
                  <h3>{x.name}</h3>
                </Link>
                <h4>Price: {x.price / 100}</h4>
                <button
                  onClick={async () => {
                    await updateCart(cart, x.name);
                  }}
                >
                  Add to Cart
                </button>

                <h4>
                  Sold By: <Link to={`/sellers/${x.seller}`}>{x.seller}</Link>
                </h4>
              </div>
            );
          }
        }
      })}
    </div>
  );
};

export default Products;
