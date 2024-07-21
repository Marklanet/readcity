import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer">
      <div className="links">
        <Link to="/home">
          <span>Dashboard</span>
        </Link>
        <Link to="/reading-list">
          <span>Reading List</span>
        </Link>
        <Link to="/books">
          <span>Books</span>
        </Link>
      </div>
      <span>
        © Readcity Technology 2024. All Rights Reserved. By Mark Onyango
      </span>
    </section>
  );
};

export default Footer;
