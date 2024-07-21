import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ReadingListProvider } from "../../context/ReadingListContext";
import Home from "../../../pages/home/Home";
import Books from "../../../pages/books/Books";
import ReadingList from "../../../pages/readinglist/ReadingList";
import UserTopbar from "../../common/topbar/UserTopbar";
import Footer from "../../common/footer/Footer";

const TeacherView = () => {
  return (
    <Router>
      <ReadingListProvider>
        <UserTopbar />
        <div className="teacher-view">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/reading-list" element={<ReadingList />} />
            <Route exact path="/books" element={<Books />} />
          </Routes>
        </div>
        <Footer />
      </ReadingListProvider>
    </Router>
  );
};

export default TeacherView;
