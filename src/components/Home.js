import React, { useState, useEffect } from "react";

const Home = ({ name }) => {
  if(name === ''){
    return <h1>Welcome Guest! Please sign in to shop or sell!</h1>;
  } else{
    return <h1>Welcome {name}!</h1>;
  }
  
};

export default Home;
