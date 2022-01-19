import axios from "axios";
import {
  getToken,
  storeToken,
  storeUser,
  storeSeller,
  storeAdmin
} from "../auth";
const BASE = "https://something-2.herokuapp.com/api";

// this is an example for an api call with axios
export async function getUsers() {
  try {
    const { data } = await axios.get(`${BASE}/users`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/users/register`, {
      username: username,
      password: password
    });
    storeToken(data.token);
    storeUser(data.username);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/users/login`, {
      username: username,
      password: password
    });
    storeToken(data.token);
    storeUser(data.username);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMeWithId(id) {
  try {
    const { data } = await axios.post(`${BASE}/users/myId`, {
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMeWithName(name) {
  try {
    const { data } = await axios.post(`${BASE}/users/myName`, {
      username: name
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateMyCart(cart, currentprice, id) {
  const myToken = getToken();
  try {
    const { data } = await axios.patch(`${BASE}/users/myCart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`
      },
      cart: cart,
      currentprice: currentprice,
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${BASE}/products`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(
  name,
  description,
  price,
  seller,
  category,
  inventory,
  picture
) {
  const myToken = getToken();
  try {
    const { data } = await axios.post(`${BASE}/products`, {
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${myToken}`
      },
      name: name,
      description: description,
      price: price,
      seller: seller,
      category: category,
      inventory: inventory,
      picture: picture
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  const myToken = getToken();
  try {
    const { data } = await axios.post(`${BASE}/products/delete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`
      },
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editProduct(
  name,
  description,
  price,
  seller,
  category,
  inventory,
  picture
) {
  const myToken = getToken();
  try {
    const { data } = await axios.patch(`${BASE}/products`, {
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${myToken}`
      },
      name: name,
      description: description,
      price: price,
      seller: seller,
      category: category,
      inventory: inventory,
      picture: picture
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editProductAdmin(
  id,
  name,
  description,
  price,
  seller,
  category,
  inventory,
  picture,
  reviews
) {
  const myToken = getToken();
  try {
    const { data } = await axios.patch(`${BASE}/products/admin`, {
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${myToken}`
      },
      id: id,
      name: name,
      description: description,
      price: price,
      seller: seller,
      category: category,
      inventory: inventory,
      picture: picture,
      reviews: reviews
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addReview(object, id) {
  const myToken = getToken();
  try {
    const { data } = await axios.post(`${BASE}/products/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`
      },
      object: object,
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductWithName(name) {
  try {
    const { data } = await axios.post(`${BASE}/products/name`, {
      name: name
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductWithId(id) {
  try {
    const { data } = await axios.post(`${BASE}/products/id`, {
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductWithSeller(seller) {
  try {
    const { data } = await axios.post(`${BASE}/products/seller`, {
      seller: seller
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductWithCategory(category) {
  try {
    const { data } = await axios.post(`${BASE}/products/category`, {
      category: category
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductWithPrice(low, high) {
  try {
    const { data } = await axios.post(`${BASE}/products/price`, {
      low: low,
      high: high
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSellers() {
  try {
    const { data } = await axios.get(`${BASE}/sellers`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerSeller(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/sellers/register`, {
      username: username,
      password: password
    });
    storeToken(data.token);
    storeSeller(data.username);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginSeller(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/sellers/login`, {
      username: username,
      password: password
    });
    storeToken(data.token);
    storeSeller(data.username);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSellerWithId(id) {
  try {
    const { data } = await axios.post(`${BASE}/sellers/myId`, {
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSellerWithName(name) {
  try {
    const { data } = await axios.post(`${BASE}/sellers/myName`, {
      username: name
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getReciepts() {
  try {
    const { data } = await axios.get(`${BASE}/reciepts`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRecieptWithName(username) {
  const myToken = getToken();
  try {
    const { data } = await axios.post(`${BASE}/reciepts/myReciepts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`
      },
      username: username
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkOut(name, items, totalprice, date, id) {
  const myToken = getToken();
  try {
    const { data } = await axios.post(`${BASE}/receipts/checkout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`
      },
      name: name,
      items: items,
      totalprice: totalprice,
      date: date,
      id: id
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginAdmin(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/admin`, {
      username: username,
      password: password
    });
    storeToken(data.token);
    storeAdmin(data.username);
    return data;
  } catch (error) {
    throw error;
  }
}
