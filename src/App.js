import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/initialpage/Sidebar/Header";
import Sidebar from "./components/initialpage/Sidebar/sidebar";
import PublisherAdd from "./components/MainPage/BBA_Library/Admin/PublisherAdd";
import DashBoard from "./components/MainPage/BBA_Library/Admin/DashBoard";
import CategoryAdd from "./components/MainPage/BBA_Library/Admin/CategoryAdd";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
