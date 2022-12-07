/**
 * App Header
 */

import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { Link } from "react-router-dom";

import "../../../assets/css/font-awesome.min.css";
import "../../../assets/css/line-awesome.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../../../assets/css/bootstrap-datetimepicker.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/select2.min.css";
import "../../../assets/css/style.css";
import "../../../assets/js/app";
import "../../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../CommonUrl";

const Sidebar = () => {
  const location = useLocation();
  let pathname = location.pathname;
  const [BookARentStatusData, setBookARentStatusData] = useState([]);
  const [BookPendingRequestData, setBookPendingRequestData] = useState([]);
  const [BookAcceptgRequestData, setBookAcceptgRequestData] = useState([]);
  const [AdditionalTimeData, setAdditionalTimeData] = useState([]);

  useEffect(() => {}, []);
  //getAccetBookRequest
  const EMP_Designation = "librarian";
  return (
    <>
      <div className="sidebar sidebar_library" id="sidebar">
        <div className="sidebar-inner sidebar-inner_library slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul class="upper_ul">
              {EMP_Designation && EMP_Designation === "librarian" && (
                <>
                  <li>
                    <Link
                      className={pathname.includes("/admin") ? "active1" : ""}
                      to="/admin"
                    >
                      <i className="la la-home" /> <span> Dashboard</span>
                    </Link>
                  </li>

                  <li className="submenu text-start">
                    <a href="#">
                      <i class="fa fa-plus-square-o" aria-hidden="true"></i>
                      <span> Add New</span> <span className="menu-arrow" />
                    </a>
                    <ul class="inner_ul" style={{ display: "none" }}>
                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/publisher/add")
                              ? "active"
                              : ""
                          }
                          to="/admin/publisher/add"
                        >
                          Add New Publisher
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/category/add")
                              ? "active"
                              : ""
                          }
                          to="/admin/category/add"
                        >
                          Add New Category
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/book/list") ? "active" : ""
                      }
                      to="/admin/book/list"
                    >
                      <i class="fa fa-book" aria-hidden="true"></i>
                      <span> Book List</span>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/admin/reportgenerate")
                          ? "active"
                          : ""
                      }
                      to="/admin/reportgenerate"
                    >
                      <i class="fa fa-print" aria-hidden="true"></i>
                      <span>Generate Report</span>{" "}
                    </Link>
                  </li>

                  <li className="submenu text-start">
                    <a href="#">
                      <i class="fa fa-file-text-o" aria-hidden="true"></i>
                      <span>Book Status</span> <span className="menu-arrow" />
                    </a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/pending/view")
                              ? "active"
                              : ""
                          }
                          to="/admin/pending/view"
                        >
                          Book Request Pending
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/accept/view")
                              ? "active position-relative"
                              : ""
                          }
                          to="/admin/accept/view"
                        >
                          Book Request Accept{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/declined/view")
                              ? "active"
                              : ""
                          }
                          to="/admin/declined/view"
                        >
                          Book Request Declined{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/bookrent/view")
                              ? "active"
                              : ""
                          }
                          to="/admin/bookrent/view"
                        >
                          Book Rent Status{" "}
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={
                            pathname.includes("/admin/renew/view")
                              ? "active"
                              : ""
                          }
                          to="/admin/renew/view"
                        >
                          Book Renew{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {/* user profile start */}
              {EMP_Designation && EMP_Designation === "librarian" && (
                <>
                  <li>
                    <Link
                      className={
                        pathname.includes("/user/dashboard") ? "active" : ""
                      }
                      to="/user/dashboard"
                    >
                      <i className="la la-home" /> <span> Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/view/categories") ? "active" : ""
                      }
                      to="/view/categories"
                    >
                      <i class="fa fa-book" aria-hidden="true"></i>{" "}
                      <span> Book List</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/user/view/bookRequestStatus")
                          ? "active"
                          : ""
                      }
                      to="/user/view/bookRequestStatus"
                    >
                      <i class="fa fa-file-text-o" aria-hidden="true"></i>
                      <span> Book Request Status</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("/user/view/previousrequest_status")
                          ? "active"
                          : ""
                      }
                      to="/user/view/previousrequest_status"
                    >
                      <i class="fa fa-list-alt" aria-hidden="true"></i>
                      <span> Previous Book Record</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
