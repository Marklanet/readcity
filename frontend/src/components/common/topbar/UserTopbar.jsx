import React from "react";
import "./usertopbar.css";
import { Link, useMatch } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import logo from "../../../assets/icons/favicon.png";

const Topbar = ({ logedinuser }) => {
  const navLinks = [
    { link_to: "home", title: "Home", icon: HomeIcon },
    {
      link_to: "reading-list",
      title: "Reading List",
      icon: BookmarkBorderIcon,
    },
    { link_to: "books", title: "Books", icon: LibraryBooksRoundedIcon },
  ];

  return (
    <div className="user-topbar">
      <div className="container flex-between">
        <div className="left flex-start">
          <img src={logo} alt="" />
          <h1 className="dark-text-gradient">Readcity</h1>

          <div className="valid-user">
            {navLinks.map((navigationLink, index) => {
              const isActive = useMatch(navigationLink.link_to);

              return (
                <Link
                  to={navigationLink.link_to}
                  key={index}
                  className={`holder ${isActive ? "active-link" : ""}`}
                >
                  <span>{navigationLink.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="right">
          <div className="no-user">
            <button className="dark-btn">Learn More</button>
            <button className="light-btn">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
