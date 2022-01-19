import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getToken, getUser, getSeller, getAdmin } from "./auth";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {
  About,
  Header,
  NavBar,
  Register,
  Login,
  UserPage,
  Products,
  Cart,
  SingleProductPage,
  SingleSellerPage,
  Home
} from "./components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [person, setPerson] = useState("");

  useEffect(() => {
    let user = getUser();
    let seller = getSeller();
    let admin = getAdmin();
    if (user !== null) {
      setIsLoggedIn(true);
      setPerson(user);
    } else if (seller !== null) {
      setIsLoggedIn(true);
      setIsSeller(true);
      setPerson(seller);
    } else if (admin !== null) {
      setIsLoggedIn(true);
      setPerson(admin);
    }
  }, []);

  return (
    <div id="App">
      <Header />
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isSeller={isSeller}
        name={person}
      />
      <Switch>
        <Route path="/register">
          <Register setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} />
        </Route>
        <Route path="/home">
          <Home name={person} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} />
        </Route>
        <Route path="/cart">
          <Cart name={person} />
        </Route>
        <Route path="/product">
          <Products isSeller={isSeller} name={person} />
        </Route>
        <Route path="/products/:productsId">
          <SingleProductPage isSeller={isSeller} person={person} />
        </Route>
        <Route path="/sellers/:sellersName">
          <SingleSellerPage isSeller={isSeller} name={person} />
        </Route>
      </Switch>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
