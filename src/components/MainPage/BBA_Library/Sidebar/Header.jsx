import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../../assets/js/app";
import {
  Avatar_02,
  Avatar_03,
  Avatar_05,
  Avatar_06,
  Avatar_08,
  Avatar_09,
  Avatar_13,
  Avatar_17,
  Avatar_21,
  headerlogo,
} from "../../../Entryfile/imagepath";
import axios from "axios";
function Header() {
  const Navigate = useNavigate();
  const Logout = () => {
    //  localStorage.removeItem("LoginData");
    Navigate("administrationlandingpage");
  };
  const location = useLocation();
  let pathname = location.pathname;
  const logOutBtnHandler = () => {
    window.sessionStorage.clear();
  };
  useEffect(() => {
    console.log(pathname);
  }, []);
  const roleId = Cookies.get("Role");
  return (
    <div>
      <div>
        <div className="header header_library" style={{ right: "0px" }}>
          {/* Logo */}
          <div className="header-left">
            <Link to="/" className="logo">
              <img src={headerlogo} width={40} height={40} alt="" />
            </Link>
          </div>
          {/* /Logo */}
          <a
            id="toggle_btn"
            href=""
            style={{
              display: pathname.includes("tasks")
                ? "none"
                : pathname.includes("compose")
                ? "none"
                : "",
            }}
          >
            <span className="bar-icon">
              <span />
              <span />
              <span />
            </span>
          </a>
          {/* Header Title */}
          <div className="page-title-box">
            <Link to={"/"}>
              <h3>BBA LIBRARY</h3>
            </Link>
          </div>
          {/* /Header Title */}

          <a id="mobile_btn" className="mobile_btn" href="#sidebar">
            <i className="fa fa-bars" />
          </a>
          {/* Header Menu */}
          <ul className="nav user-menu">
            {/* Search */}
            <li className="nav-item">
              <div className="top-nav-search">
                <a href="" className="responsive-search">
                  <i className="fa fa-search" />
                </a>
                {/* <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search here"
                  />
                  <button className="btn" type="submit">
                    <i className="fa fa-search" />
                  </button>
                </form> */}
              </div>
            </li>
            {/* /Search */}
            {/* Flag */}
            {/* /Flag */}
            {/* Notifications */}
            {/* <li className="nav-item dropdown">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <i className="fa fa-bell-o" />{" "}
                <span className="badge badge-pill">3</span>
              </a>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  <a href="" className="clear-noti">
                    {" "}
                    Clear All{" "}
                  </a>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/app/administrator/activities"
                      >
                        <div className="media">
                          <span className="avatar">
                            <img alt="" src={Avatar_02} />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">John Doe</span> added
                              new task{" "}
                              <span className="noti-title">
                                Patient appointment booking
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                4 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/app/administrator/activities"
                      >
                        <div className="media">
                          <span className="avatar">
                            <img alt="" src={Avatar_03} />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                Tarah Shropshire
                              </span>{" "}
                              changed the task name{" "}
                              <span className="noti-title">
                                Appointment booking with payment gateway
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                6 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/app/administrator/activities"
                      >
                        <div className="media">
                          <span className="avatar">
                            <img alt="" src={Avatar_06} />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Misty Tison</span>{" "}
                              added{" "}
                              <span className="noti-title">
                                Domenic Houston
                              </span>{" "}
                              and{" "}
                              <span className="noti-title">Claire Mapes</span>{" "}
                              to project{" "}
                              <span className="noti-title">
                                Doctor available module
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                8 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/app/administrator/activities"
                      >
                        <div className="media">
                          <span className="avatar">
                            <img alt="" src={Avatar_17} />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Rolland Webber</span>{" "}
                              completed task{" "}
                              <span className="noti-title">
                                Patient and Doctor video conferencing
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                12 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link
                        onClick={() =>
                          localStorage.setItem("minheight", "true")
                        }
                        to="/app/administrator/activities"
                      >
                        <div className="media">
                          <span className="avatar">
                            <img alt="" src={Avatar_13} />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                Bernardo Galaviz
                              </span>{" "}
                              added new task{" "}
                              <span className="noti-title">
                                Private chat module
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                2 days ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <Link
                    onClick={() => localStorage.setItem("minheight", "true")}
                    to="/app/administrator/activities"
                  >
                    View all Notifications
                  </Link>
                </div>
              </div>
            </li> */}
            {/* /Notifications */}
            {/* Message Notifications */}
            {roleId === 6 && (
              <>
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                  >
                    <i class="fa fa-tasks" aria-hidden="true"></i>
                    <span
                      className="badge"
                      style={{ backgroundColor: " #29a481 !important" }}
                    >
                      8
                    </span>
                  </a>
                </li>
                {/* /Message Notifications */}

                <li className="nav-item dropdown has-arrow main-drop">
                  <a
                    href="#"
                    className="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                  >
                    <span className="user-img">
                      <img src={Avatar_21} alt="" />
                      <span className="status online" />
                    </span>
                    <span class="pl-2">Admin</span>
                  </a>
                  <div className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to="/app/profile/employee-profile"
                    >
                      My Profile
                    </Link>

                    <a className="dropdown-item" onClick={() => Logout()}>
                      Logout
                    </a>
                  </div>
                </li>
              </>
            )}
            {roleId !== 6 && (
              <>
                <li className="nav-item dropdown has-arrow main-drop">
                  <a
                    href="#"
                    className="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                  >
                    <span className="user-img">
                      <img src={Avatar_21} alt="" />
                      <span className="status online" />
                    </span>
                    <span class="pl-2">User</span>
                  </a>
                  <div className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to="/app/profile/employee-profile"
                    >
                      My Profile
                    </Link>

                    <a className="dropdown-item" onClick={() => Logout()}>
                      Logout
                    </a>
                  </div>
                </li>
              </>
            )}
          </ul>
          {/* /Header Menu */}
          {/* Mobile Menu */}
          <div className="dropdown mobile-user-menu">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-v" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link
                className="dropdown-item"
                to="/app/profile/employee-profile"
              >
                My Profile
              </Link>
              <Link className="dropdown-item" to="/settings/companysetting">
                Settings
              </Link>
              <a className="dropdown-item" onClick={() => Logout}>
                Logout99
              </a>
            </div>
          </div>
          {/* /Mobile Menu */}
        </div>
      </div>
    </div>
  );
}
export default Header;
