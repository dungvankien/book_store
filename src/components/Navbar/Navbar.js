import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to={"/bookstore-app/"}>
          <h1 className="d-flex text-warning align-items-center">
            <i className="fa-solid fa-book-open-reader text-warning me-2 display-5"></i>
            BookStore
          </h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
