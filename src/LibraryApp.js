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
import Ebook from "./components/MainPage/BBA_Library/Admin/Ebook";
import TestEbook from "./components/MainPage/BBA_Library/Admin/TestEbook";
import UserDashBoard from "./components/MainPage/BBA_Library/User/UserDashBoard";
import PdfView from "./components/MainPage/BBA_Library/Admin/PdfView";

function LibraryApp() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/admin" element={<DashBoard />} />
        <Route path="/admin/publisher/add" element={<PublisherAdd />} />
        <Route path="/admin/category/add" element={<CategoryAdd />} />
        <Route path="/admin/book/list" element={<BookAdd />} />
        <Route path="/admin/pending/view" element={<BookRequestPending />} />
        <Route path="/admin/accept/view" element={<BookRequestAccept />} />
        <Route path="/admin/declined/view" element={<BookRequestDeclined />} />
        <Route path="/admin/bookrent/view" element={<BookRentStatus />} />
        <Route path="/admin/renew/view" element={<AdditionalTimeRequest />} />
        <Route
          path="/admin/renew/single/view/:bookrent_id"
          element={<AdditionalTimeRequestAccept />}
        />
        <Route path="/admin/reportgenerate" element={<ReportGenerate />} />
        <Route path="/ebook" element={<Ebook />} />
        <Route path="/pdfbook" element={<PdfView />} />

        {/* common */}
        <Route path="/view/categories" element={<CategoriesView />} />
        <Route
          path="/view/categories/:category"
          element={<CategoriesView_single />}
        />
        <Route path="/view/bookRequestStatus" element={<BookRequestStatus />} />
        <Route
          path="/view/previousrequest_status"
          element={<PreviousRecord />}
        />
        <Route path="/test" element={<TestEbook />} />
        <Route path="/user/dashboard" element={<UserDashBoard />} />
      </Routes>
    </div>
  );
}

export default LibraryApp;
