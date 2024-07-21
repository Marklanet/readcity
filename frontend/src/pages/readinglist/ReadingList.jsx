import React, { useState, useContext, useEffect, useRef } from "react";
import "./readinglist.css";
import playimage from "../../assets/banners/background3.jpg";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BookPlayer from "../../components/reusable/bookplayer/BookPlayer";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { GraphQLClient, gql } from "graphql-request";
import Swal from "sweetalert2";
import { ReadingListContext } from "../../components/context/ReadingListContext";
import BookList from "../../components/reusable/booklist/BookList";

const ReadingList = () => {
  const [click, setClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { readingList, setReadingList } = useContext(ReadingListContext);
  const [searchClick, setSearchClick] = useState(false);
  const [playingBook, setPlayingBook] = useState([]);
  const suggestionsRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) {
    console.error("VITE_BACKEND_URL is not defined");
  }
  const client = new GraphQLClient(backendUrl);

  const fetchBooks = async () => {
    const query = gql`
      query Books {
        books {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    try {
      const data = await client.request(query);
      return data.books;
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const books = await fetchBooks();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
    setSearchClick(true);
    setSuggestions([]);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setSearchClick(false);
      return;
    }

    const fetchSuggestions = async () => {
      const books = await fetchBooks();
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredBooks);
    };
    fetchSuggestions();
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSuggestions([]);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    iconColor: "var(--middle-color)",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const addPlayingBookToReadingList = () => {
    const exists = readingList.some(
      (item) => item.title === playingBook[0].title
    );

    if (exists) {
      Swal.fire({
        title: "Oops...",
        titleColor: "var(--middle-color)",
        text: `${playingBook[0].title} is already in your reading list!`,
        icon: "info",
        iconColor: "var(--middle-color)",
        confirmButtonText: "OK",
        confirmButtonColor: "var(--dark-color)",
      });
    } else {
      setReadingList((prevList) => [...prevList, playingBook[0]]);
      Toast.fire({
        icon: "success",
        title: `${playingBook[0].title} added to your reading list.`,
      });
    }
  };

  const removePlayingBookFromReadingList = () => {
    setReadingList((prevList) =>
      prevList.filter((item) => item.title !== playingBook[0].title)
    );
    Swal.fire({
      title: "Removed",
      titleColor: "var(--middle-color)",
      text: `${playingBook[0].title} has been removed from your reading list.`,
      icon: "success",
      iconColor: "var(--middle-color)",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--dark-color)",
    });
  };

  const addToPlayer = (book) => {
    setPlayingBook([book]);
    setClick(true);
  };

  const handleSuggestionClick = (book) => {
    setSearchTerm("");
    setSearchResults([book]);
    setSearchClick(true);
    setSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInterupt = () => {
    setClick(false);
  };

  return (
    <div className="all-page">
      <div className="left">
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books..."
              className="search-input"
            />
            {searchTerm && (
              <CloseIcon className="clear-icon" onClick={clearSearch} />
            )}
          </div>
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
        {searchTerm && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="suggestions">
            {suggestions.map((book, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(book)}
              >
                {book.title}
              </div>
            ))}
          </div>
        )}
        <div className="result-holder">
          <BookList
            searchClick={searchClick}
            books={searchResults}
            addToPlayer={addToPlayer}
            readingList={readingList}
          />
        </div>
      </div>
      <div className={`right ${click ? "show-on-top" : "hide"}`}>
        {!click ? (
          <div className={`cover ${click ? "" : "hide"}`}>
            <div className="back">
              <img src={playimage} alt="" />
            </div>
            <div className="front">
              <YouTubeIcon className="icon" onClick={() => setClick(true)} />
            </div>
          </div>
        ) : (
          <BookPlayer
            bookToPlay={playingBook}
            interupt={handleInterupt}
            addToReadingList={addPlayingBookToReadingList}
            removeFromReadingList={removePlayingBookFromReadingList}
            readingList={readingList}
          />
        )}
      </div>
    </div>
  );
};

export default ReadingList;
