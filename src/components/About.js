import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <header>
        <h1>The About Page</h1>
      </header>
      <p>
        This is a shopping website where users can buy products and sellers can
        list their products. Obviously the products and sellers are fake,
        inspired by a game called Undertale. So don't give your credit card
        information up unless you want money to randomly disappear. While the
        concept of creating this website seems easy, many functions were made to
        make it possible, such as: adding/removing products from the cart,
        loading product pages with the ability to add reviews, logging and
        registering users and sellers, and too many more to count. Please feel
        free to mess around with the website and if you like what you see, my
        resume and the github to this website are linked below. Thank you!
      </p>
      <p>
        Resume:
        <a href="./Matthew_Hill.docx" download>
          Download Here
        </a>
      </p>
      <p>
        Github: <a href="https://github.com/MattHill701/shop">Link Here</a>
      </p>
    </>
  );
};

export default About;
