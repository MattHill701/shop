import ReactDom from "react-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Route, Switch, Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn, isSeller, name }) => {
  return (
    <div className="nav-bar">
      {isSeller ? (
        <Link className="nav-bar-link" to={`/${name}`}>
          My Page
        </Link>
      ) : (
        <Link className="nav-bar-link" to="/cart">
          Cart
        </Link>
      )}
      <Link className="nav-bar-link" to="/product">
        Products
      </Link>
      {isLoggedIn ? (
        <div className="auth-links">
          <button
            className="nav-bar-link"
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-links">
          <Link className="nav-bar-link" to="/login">
            Login
          </Link>
          <Link className="nav-bar-link" to="/register">
            Register
          </Link>
        </div>
      )}
      <Link className="nav-bar-link" to="/about">
        About
      </Link>
    </div>
  );
};

export default NavBar;
