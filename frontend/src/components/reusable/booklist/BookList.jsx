import React, { useContext, useEffect, useState } from "react";
import "./booklist.css";
import searchicon from "../../../assets/icons/searchicon.svg";
import Swal from "sweetalert2";
import { ReadingListContext } from "../../context/ReadingListContext";
import ListItem from "../listitem/ListItem";
import { GraphQLClient, gql } from "graphql-request";
import { useMatch } from "react-router-dom";

/*
  This is a reusable dynamic component that displays data based on url
  By coding it like this, we avoid rewriting mutiple components
*/

const BookList = ({ searchClick, books, addToPlayer }) => {
  const [initialBooks, setInitialBooks] = useState([]);
  const { readingList, setReadingList } = useContext(ReadingListContext);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const matchBooks = useMatch("/books");
  const matchReadingList = useMatch("/reading-list");

  const booksToDisplay = (data) => {
    /*
      Use Fisher-Yates shuffle algorithm
      To randomize books, to enhance user experience
    */
    const shuffleArray = (array) => {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };

    if (matchBooks) {
      setInitialBooks(data.books);
    } else if (matchReadingList) {
      setInitialBooks(readingList);
    } else {
      setInitialBooks(shuffleArray(data.books).slice(0, 12));
    }
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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) {
    console.error("VITE_BACKEND_URL is not defined");
  }
  const client = new GraphQLClient(backendUrl);

  const fetchInitialBooks = async () => {
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
      booksToDisplay(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (!searchClick && books.length === 0) {
      fetchInitialBooks();
    }
  }, [searchClick, books]);

  useEffect(() => {
    if (matchReadingList) {
      setInitialBooks(readingList);
    }
  }, [readingList, matchReadingList, triggerRefresh]);

  const addToReadingList = (book) => {
    const exists = readingList.some((item) => item.title === book.title);

    if (exists) {
      Swal.fire({
        title: "Oops...",
        titleColor: "var(--middle-color)",
        text: `${book.title} is already in your reading list!`,
        icon: "info",
        iconColor: "var(--middle-color)",
        confirmButtonText: "OK",
        confirmButtonColor: "var(--dark-color)",
      });
    } else {
      setReadingList((prevList) => [...prevList, book]);
      Toast.fire({
        icon: "success",
        title: `${book.title} added to your reading list.`,
      });
      if (matchReadingList) {
        setTriggerRefresh(!triggerRefresh);
      }
    }
  };

  const removeFromReadingList = (book) => {
    setReadingList((prevList) =>
      prevList.filter((item) => item.title !== book.title)
    );
    Swal.fire({
      title: "Removed",
      titleColor: "var(--middle-color)",
      text: `${book.title} has been removed from your reading list.`,
      icon: "success",
      iconColor: "var(--middle-color)",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--dark-color)",
    });
    if (matchReadingList) {
      setTriggerRefresh(!triggerRefresh);
    }
  };

  return (
    <div className="book-list">
      {books.length === 0 ? (
        searchClick ? (
          <div className="no-results">
            <img src={searchicon} alt="Search Icon" />
            <p>No Matching Results</p>
          </div>
        ) : readingList.length === 0 && matchReadingList ? (
          <div className="no-results">
            <img src={searchicon} alt="Search Icon" />
            <p>Empty Reading List</p>
          </div>
        ) : (
          <ul className="items-holder">
            {initialBooks.map((book, index) => (
              <ListItem
                key={index}
                item={book}
                addToReadingList={addToReadingList}
                removeFromReadingList={removeFromReadingList}
                addToPlayer={addToPlayer}
                readingList={readingList}
              />
            ))}
          </ul>
        )
      ) : (
        <ul className="items-holder">
          {books.map((book, index) => (
            <ListItem
              key={index}
              item={book}
              addToReadingList={addToReadingList}
              removeFromReadingList={removeFromReadingList}
              addToPlayer={addToPlayer}
              readingList={readingList}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
