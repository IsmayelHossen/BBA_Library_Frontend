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
import PreviousRecord from "./components/MainPage/BBA_Library/User/PreviousRecord";
import AdditionalTimeRequest from "./components/MainPage/BBA_Library/Admin/AdditionalTimeRequest";
import AdditionalTimeRequestAccept from "./components/MainPage/BBA_Library/Admin/AdditionalTimeRequestAccept";

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
          <Route path="admin/library/book/list" element={<BookAdd />} />
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
          <Route
            path="admin/library/renew/view"
            element={<AdditionalTimeRequest />}
          />
          <Route
            path="admin/library/renew/single/view/:bookrent_id"
            element={<AdditionalTimeRequestAccept />}
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
          <Route
            path="library/view/previousrequest_status"
            element={<PreviousRecord />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
