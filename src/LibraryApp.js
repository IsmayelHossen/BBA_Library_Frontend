import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/MainPage/BBA_Library/Sidebar/Header";
import Sidebar from "./components/MainPage/BBA_Library/Sidebar/sidebar";
import PublisherAdd from "./components/MainPage/BBA_Library/Admin/PublisherAdd";
import DashBoard from "./components/MainPage/BBA_Library/Admin/DashBoard";
import CategoryAdd from "./components/MainPage/BBA_Library/Admin/CategoryAdd";
import BookAdd from "./components/MainPage/BBA_Library/Admin/BookAdd";
import CategoriesView from "./components/MainPage/BBA_Library/User/CategoriesView";
import CategoriesView_single from "./components/MainPage/BBA_Library/User/CategoriesView_single";
import BookRequestPending from "./components/MainPage/BBA_Library/Admin/BookRequestPending";
import BookRequestAccept from "./components/MainPage/BBA_Library/Admin/BookRequestAccept";
import BookRentStatus from "./components/MainPage/BBA_Library/Admin/BookRentStatus";
import BookRequestStatus from "./components/MainPage/BBA_Library/User/BookRequestStatus";
import PreviousRecord from "./components/MainPage/BBA_Library/User/PreviousRecord";
import AdditionalTimeRequest from "./components/MainPage/BBA_Library/Admin/AdditionalTimeRequest";
import AdditionalTimeRequestAccept from "./components/MainPage/BBA_Library/Admin/AdditionalTimeRequestAccept";
import BookRequestDeclined from "./components/MainPage/BBA_Library/Admin/BookRequestDeclined";
import ReportGenerate from "./components/MainPage/BBA_Library/Admin/ReportGenerate";
import UserDashBoard from "./components/MainPage/BBA_Library/User/UserDashBoard";
import AdminRouteCheck from "./components/MainPage/BBA_Library/AdminRouteCheck";
import UserBookRenew from "./components/MainPage/BBA_Library/User/UserBookRenew";
import SmsSetting from "./components/MainPage/BBA_Library/Admin/SmsSetting";
import MaxbookLimit from "./components/MainPage/BBA_Library/Admin/MaxbookLimit";

function LibraryApp() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      {/* Admin Routes  start*/}
      <Routes>
        <Route path="/admin/*" element={<AdminRouteCheck />}>
          <Route path="" element={<DashBoard />} />
          <Route path="publisher/add" element={<PublisherAdd />} />
          <Route path="category/add" element={<CategoryAdd />} />
          <Route path="book/list" element={<BookAdd />} />
          <Route path="pending/view" element={<BookRequestPending />} />
          <Route path="accept/view" element={<BookRequestAccept />} />
          <Route path="declined/view" element={<BookRequestDeclined />} />
          <Route path="bookrent/view" element={<BookRentStatus />} />
          <Route path="renew/view" element={<AdditionalTimeRequest />} />
          <Route path="smsSettings/view" element={<SmsSetting />} />
          <Route path="maxbooklimit/add" element={<MaxbookLimit />} />
          <Route
            path="renew/single/view/:bookrent_id"
            element={<AdditionalTimeRequestAccept />}
          />
          <Route path="reportgenerate" element={<ReportGenerate />} />
        </Route>
        {/* Admin routes end */}
        {/* common  routes start */}
        <Route path="/view/categories" element={<CategoriesView />} />
        <Route
          path="/view/categories/:category"
          element={<CategoriesView_single />}
        />
        {/* common routes end */}

        {/* user routes start */}
        <Route
          path="/user/view/bookRequestStatus"
          element={<BookRequestStatus />}
        />
        <Route
          path="/user/view/previousrequest_status"
          element={<PreviousRecord />}
        />
        <Route path="/user/view/renew_status" element={<UserBookRenew />} />

        <Route path="/user/dashboard" element={<UserDashBoard />} />

        {/* user routes end */}
      </Routes>
    </div>
  );
}

export default LibraryApp;
