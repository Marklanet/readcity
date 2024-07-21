import React, { createContext, useState } from "react";

export const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);

  return (
    <ReadingListContext.Provider value={{ readingList, setReadingList }}>
      {children}
    </ReadingListContext.Provider>
  );
};
