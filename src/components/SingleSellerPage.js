import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  getProductWithName,
  getProductWithSeller,
  getMeWithName,
  updateMyCart,
  getSellerWithName,
  deleteProduct,
  createProduct,
  editProduct
} from "../api";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

const SingleSellerPage = ({ isSeller, name }) => {
  const { sellersName } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [description, setDescription] = useState("");
  const [prodescription, setProdescription] = useState("");
  const [proname, setProname] = useState("");
  const [proprice, setProprice] = useState("");
  const [procategory, setProcategory] = useState("");
  const [proinventory, setProinventory] = useState("");
  const [propicture, setPropicture] = useState("");
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
        setCart(x.me.cart);
        setId(x.me.id);
        setPrice(x.me.currentprice);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getSellerWithName(sellersName)
      .then((x) => {
        setDescription(x.me.description);
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
      <h1>{sellersName}</h1>
      <h1>{description}</h1>
      {products.map((x) => {
        if (x.seller === sellersName) {
          if (isSeller === true && name === sellersName) {
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
                <button
                  onClick={async () => {
                    await deleteProduct(x.id);
                  }}
                >
                  Delete Me
                </button>
              </div>
            );
          } else {
            return (
              <div key={x.id}>
                <img src={x.picture} alt="product"></img>
                <Link to={`/products/${x.id}`}>
                  <h3>{x.name}</h3>
                </Link>
                <h4>Price: {x.price / 100}</h4>
                <button
                  onClick={async () => {
                    if (isSeller === true || name === "administrator"  || name === "") {
                      alert("Sign in as a user to shop!");
                    } else {
                      await updateCart(cart, x.name);
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          }
        } else {
          return null;
        }
      })}
      {isSeller === true && name === sellersName && (
        <div>
          <form
            id="newPostSubmit"
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                await createProduct(
                  proname,
                  prodescription,
                  proprice,
                  sellersName,
                  procategory,
                  proinventory,
                  propicture
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <h2>Add a Product</h2>
            <fieldset className="auth-component-input">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="name"
                value={proname}
                onChange={(event) => {
                  setProname(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="review">Description:</label>
              <input
                id="description"
                type="text"
                placeholder="description"
                value={prodescription}
                onChange={(event) => {
                  setProdescription(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="price">Price:</label>
              <input
                id="price"
                type="text"
                placeholder="price"
                value={proprice}
                onChange={(event) => {
                  setProprice(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="category">Category:</label>
              <input
                id="category"
                type="text"
                placeholder="category"
                value={procategory}
                onChange={(event) => {
                  setProcategory(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="inventory">Inventory:</label>
              <input
                id="inventory"
                type="text"
                placeholder="inventory"
                value={proinventory}
                onChange={(event) => {
                  setProinventory(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="picture">Picture URL:</label>
              <input
                id="picture"
                type="text"
                placeholder="picture"
                value={propicture}
                onChange={(event) => {
                  setPropicture(event.target.value);
                }}
              ></input>
            </fieldset>
            <button typeof="submit">Submit</button>
          </form>
          <form
            id="newPostSubmit"
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                await editProduct(
                  proname,
                  prodescription,
                  proprice,
                  sellersName,
                  procategory,
                  proinventory,
                  propicture
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <h2>Edit Product</h2>
            <fieldset className="auth-component-input">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="name"
                value={proname}
                onChange={(event) => {
                  setProname(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                placeholder="description"
                value={prodescription}
                onChange={(event) => {
                  setProdescription(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="price">Price:</label>
              <input
                id="price"
                type="text"
                placeholder="price"
                value={proprice}
                onChange={(event) => {
                  setProprice(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="category">Category:</label>
              <input
                id="category"
                type="text"
                placeholder="category"
                value={procategory}
                onChange={(event) => {
                  setProcategory(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="inventory">Inventory:</label>
              <input
                id="inventory"
                type="text"
                placeholder="inventory"
                value={proinventory}
                onChange={(event) => {
                  setProinventory(event.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset className="auth-component-input">
              <label htmlFor="picture">Picture URL:</label>
              <input
                id="picture"
                type="text"
                placeholder="picture"
                value={propicture}
                onChange={(event) => {
                  setPropicture(event.target.value);
                }}
              ></input>
            </fieldset>
            <button typeof="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleSellerPage;
