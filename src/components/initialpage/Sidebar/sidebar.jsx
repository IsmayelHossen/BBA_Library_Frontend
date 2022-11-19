/**
 * App Header
 */

import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { Link } from "react-router-dom";

import "../../assets/css/font-awesome.min.css";
import "../../assets/css/line-awesome.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../../assets/css/bootstrap-datetimepicker.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/select2.min.css";
import "../../assets/css/style.css";
import "../../assets/js/app";
import "../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";

const Sidebar = () => {
  const location = useLocation();
  let pathname = location.pathname;

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li>
                <Link
                  className={
                    pathname.includes("/admin/library") ? "active" : ""
                  }
                  to="/admin/library"
                >
                  <i className="la la-home" /> <span> Dashboard</span>
                </Link>
              </li>
              {/* add Vendor */}
              <li className="submenu text-start">
                <a href="/docs">
                  <i className="la la-gift" /> <span> Add New</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/library/publisher/add")
                          ? "active"
                          : ""
                      }
                      to="/admin/library/publisher/add"
                    >
                      Add New Publisher
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/library/category/Add")
                          ? "active"
                          : ""
                      }
                      to="/admin/library/category/Add"
                    >
                      Add New Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/library/book/Add")
                          ? "active"
                          : ""
                      }
                      to="/admin/library/book/Add"
                    >
                      Add New Book
                    </Link>
                  </li>
                </ul>
              </li>

              {/* add product */}
              <li className="submenu text-start">
                <a href="#">
                  <i className="fa fa-cart-plus " /> <span>User Profile</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={
                        pathname.includes("/library/view/categories")
                          ? "active"
                          : ""
                      }
                      to="/library/view/categories"
                    >
                      Categories Wise View
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/library/view/bookRequestStatus")
                          ? "active"
                          : ""
                      }
                      to="/library/view/bookRequestStatus"
                    >
                      Book Request Status
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="submenu text-start">
                <a href="#">
                  <i className="fa fa-cart-plus " /> <span>Book Status</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/library/pending/view")
                          ? "active"
                          : ""
                      }
                      to="/admin/library/pending/view"
                    >
                      Book Request Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/library/accept/view")
                          ? "active"
                          : ""
                      }
                      to="/admin/library/accept/view"
                    >
                      Book Accept Request
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/library/bookrent/view")
                          ? "active"
                          : ""
                      }
                      to="/admin/library/bookrent/view"
                    >
                      Book Rent Status
                    </Link>
                  </li>
                </ul>
              </li>

              {/* add service */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
