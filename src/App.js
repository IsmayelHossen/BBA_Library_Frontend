import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/initialpage/Sidebar/Header";
import Sidebar from "./components/initialpage/Sidebar/sidebar";
import PublisherAdd from "./components/MainPage/BBA_Library/Admin/PublisherAdd";
import DashBoard from "./components/MainPage/BBA_Library/Admin/DashBoard";
import CategoryAdd from "./components/MainPage/BBA_Library/Admin/CategoryAdd";
import BookAdd from "./components/MainPage/BBA_Library/Admin/BookAdd";
import CategoriesView from "./components/MainPage/BBA_Library//User/CategoriesView";
import CategoriesView_single from "./components/MainPage/BBA_Library/User/CategoriesView_single";
import BookRequestPending from "./components/MainPage/BBA_Library/Admin/BookRequestPending";
import BookRequestAccept from "./components/MainPage/BBA_Library/Admin/BookRequestAccept";
import BookRentStatus from "./components/MainPage/BBA_Library/Admin/BookRentStatus";
import BookRequestStatus from "./components/MainPage/BBA_Library/User/BookRequestStatus";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="admin/library" element={<DashBoard />} />
          <Route
            path="admin/library/publisher/add"
            element={<PublisherAdd />}
          />
          <Route path="admin/library/category/add" element={<CategoryAdd />} />
          <Route path="admin/library/book/add" element={<BookAdd />} />
          <Route
            path="admin/library/pending/view"
            element={<BookRequestPending />}
          />
          <Route
            path="admin/library/accept/view"
            element={<BookRequestAccept />}
          />
          <Route
            path="admin/library/bookrent/view"
            element={<BookRentStatus />}
          />

          {/* common */}
          <Route path="library/view/categories" element={<CategoriesView />} />
          <Route
            path="library/view/categories/:category"
            element={<CategoriesView_single />}
          />
          <Route
            path="library/view/bookRequestStatus"
            element={<BookRequestStatus />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
