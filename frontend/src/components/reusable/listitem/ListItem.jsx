import React from "react";
import "./listitem.css";
import Person3RoundedIcon from "@mui/icons-material/Person3Rounded";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

/*
  Reusable List Item Component
  Avoids Code Redundancy
*/
const ListItem = ({
  item,
  addToReadingList,
  removeFromReadingList,
  addToPlayer,
  readingList,
}) => {
  const isInReadingList = readingList.some((book) => book.title === item.title);

  return (
    <div className="list-item">
      <img src={item.coverPhotoURL} alt="" onClick={() => addToPlayer(item)} />
      <p>{item.title}</p>
      <span className="author">
        <Person3RoundedIcon className="icon" /> <p>{item.author}</p>
      </span>
      <div className="bottom">
        <button className="reading-level">
          <FavoriteIcon className="icon" />
        </button>
        <button
          onClick={() =>
            isInReadingList
              ? removeFromReadingList(item)
              : addToReadingList(item)
          }
        >
          {isInReadingList ? (
            <BookmarkAddedIcon className="icon" />
          ) : (
            <BookmarkIcon className="icon" />
          )}
        </button>
        <button onClick={() => addToPlayer(item)}>
          <PlayArrowIcon className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
