/**
 * Signin Firebase
 */

import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
// import useAuth from "../../../initialpage/hooks/useAuth";
import useAuth from "../../BBA_Library/useAuth";

import { BaseUrl } from "../CommonUrl";
import { SelfUrl } from "../CommonUrl";

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const UserDashBoard = ({ alldata9 }) => {
  console.log(alldata9);
  const [CategoryData, setCategoryData] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [isLoader, setisLoader] = useState(true);
  const [TotalBookUsed, setTotalBookUsed] = useState([]);
  const [PendingAcceptData, setPendingAcceptData] = useState([]);
  const [BooksData, setBooksData] = useState([]);
  const { user } = useAuth();
  const EMP_ID = user ? user.employe_id : 685;
  useEffect(() => {
    getTotalBooksUsed();
    getCategory();
    getPendingAcceptStatus();
    getBooks();
  }, []);

  const getTotalBooksUsed = () => {
    axios
      .get(`${BaseUrl}/library/view/gettotalbookUsed/${EMP_ID}`)
      .then((res) => {
        console.log(res.data.data);
        setisLoader(false);
        setTotalBookUsed(res.data.data);
      });
  };
  const getBooks = () => {
    axios.get(`${BaseUrl}/library/view/getbooks`).then((res) => {
      console.log(res.data.data);
      setisLoader(false);
      setBooksData(res.data.data);
    });
  };
  const getPendingAcceptStatus = () => {
    axios
      .get(`${BaseUrl}/library/view/gettotalbookAccepptPending/${EMP_ID}`)
      .then((res) => {
        console.log(res.data.data);
        setisLoader(false);
        setPendingAcceptData(res.data.data);
      });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getcategory`).then((res) => {
      console.log(res.data.data);
      setisLoader(false);
      setCategoryData(res.data.data);
    });
  };
  const CategoryFileCount = (category) => {
    console.log(category);
    const count = BooksData.filter((data) => data.CATEGORY_NAME == category);
    console.log(count.length);
    return count;
  };
  var NumberofCopy = 0;
  var AvailableCopy = 0;
  var AllNumberofCopy = 0;
  var AllAvailableCopy = 0;
  var totalReturn = 0;
  var totalonGoing = 0;
  var totalPending = 0;
  var totalAccept = 0;
  var totalDeclined = 0;
  var totalRenew = 0;
  return (
    <>
      <Helmet>
        <title>Dashboard - BBA Documents</title>
        <meta name="description" content="BBA DOCUMENTS" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title text-start">
                  BBA Library (User) Dashboard
                </h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {isLoader && (
            <>
              <div class="row">
                <div class="col-md-5"></div>
                <div class="col-md-2 mt-4">
                  <ColorRing
                    visible={true}
                    height="80"
                    width={100}
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
                <div class="col-md-5"></div>
              </div>
            </>
          )}
          {!isLoader && (
            <>
              <div className="row admin_dashoard_book_copy_availabltyMid">
                <h4 class="pb-2 border-bottom">Previous Records Overview</h4>
                <div className="col-md-3">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <Link to={`/user/view/previousrequest_status`}>
                        <span className="dash-widget-icon">
                          <i class="fa fa-list-alt" aria-hidden="true"></i>
                        </span>

                        <div className="dash-widget-info">
                          <h3>{TotalBookUsed?.length}</h3>
                          <span>Total Book Issued</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <Link to={`/user/view/previousrequest_status`}>
                        <span className="dash-widget-icon">
                          <i class="fa fa-undo"></i>
                        </span>

                        <div className="dash-widget-info">
                          <h3>
                            {TotalBookUsed.length &&
                              TotalBookUsed.map((row, index) => (
                                //    <>{row.status=="Service on going" && totalReturn=totalReturn+1}</>
                                <p style={{ display: "none" }}>
                                  {row.STATUS === "Release" && (
                                    <>{(totalReturn = totalReturn + 1)}</>
                                  )}
                                </p>
                              ))}
                            {totalReturn}
                          </h3>
                          <span>Total Return </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <Link to={`/user/view/previousrequest_status`}>
                        <span className="dash-widget-icon">
                          <img src={`${SelfUrl}/book_open1.png`} width="25" />
                          {/* <i class="fa fa-hand-lizard-o" aria-hidden="true"></i> */}
                        </span>

                        <div className="dash-widget-info">
                          <h3>
                            {TotalBookUsed.length &&
                              TotalBookUsed.map((row, index) => (
                                //    <>{row.status=="Service on going" && totalReturn=totalReturn+1}</>
                                <p style={{ display: "none" }}>
                                  {row.STATUS === "Service on going" && (
                                    <>{(totalonGoing = totalonGoing + 1)}</>
                                  )}
                                </p>
                              ))}
                            {totalonGoing}
                          </h3>
                          <span>Total Book Service on going </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <Link to={`/user/view/bookRequestStatus`}>
                        <span className="dash-widget-icon">
                          <i class="fa fa-tasks" aria-hidden="true"></i>
                        </span>

                        <div className="dash-widget-info">
                          <h3>
                            {PendingAcceptData.length &&
                              PendingAcceptData.map((row_p_a, index) => (
                                //    <>{row.status=="Service on going" && totalReturn=totalReturn+1}</>
                                <p style={{ display: "none" }}>
                                  {row_p_a.STATUS === 0 && (
                                    <>{(totalPending = totalPending + 1)}</>
                                  )}
                                </p>
                              ))}
                            {totalPending}
                          </h3>
                          <span>Total Pending </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <Link to={`/user/view/bookRequestStatus`}>
                        <span className="dash-widget-icon">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>

                        <div className="dash-widget-info">
                          <h3>
                            {PendingAcceptData.length &&
                              PendingAcceptData.map((row, index) => (
                                <p style={{ display: "none" }}>
                                  {row.STATUS === 1 && (
                                    <>{(totalAccept = totalAccept + 1)}</>
                                  )}
                                </p>
                              ))}
                            {totalAccept}
                          </h3>
                          <span>Total Accept </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card dash-widget">
                    <div className="card-body">
                      <Link to={`/user/view/bookRequestStatus`}>
                        <span className="dash-widget-icon">
                          <i
                            style={{
                              color: "red",
                            }}
                            class="fa fa-times"
                            aria-hidden="true"
                          ></i>
                        </span>

                        <div className="dash-widget-info">
                          <h3>
                            {PendingAcceptData.length &&
                              PendingAcceptData.map((row, index) => (
                                //    <>{row.status=="Service on going" && totalReturn=totalReturn+1}</>
                                <p style={{ display: "none" }}>
                                  {row.STATUS === 2 && (
                                    <>{(totalDeclined = totalDeclined + 1)}</>
                                  )}
                                </p>
                              ))}
                            {totalDeclined}
                          </h3>
                          <span>Total Declined </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row admin_dashoard_book_copy_availabltyMid">
                <h4 class="pb-2 border-bottom">
                  Library Overview at a galance
                </h4>
                {CategoryData != null &&
                  CategoryData.map((row, index) => (
                    <>
                      <div className="col-md-3 ">
                        <div className="card dash-widget">
                          <div className="card-body">
                            <span className="dash-widget-icon">
                              <i className="fa fa-book" />
                            </span>
                            <div className="dash-widget-info">
                              <h3>
                                {CategoryFileCount(row.CATEGORY_NAME).length}
                              </h3>
                              <Link
                                to={`/view/categories/${row.CATEGORY_NAME}`}
                              >
                                <span>{row.CATEGORY_NAME}</span>
                              </Link>
                              <h3 style={{ display: "none" }}>
                                {CategoryFileCount(row.CATEGORY_NAME).map(
                                  (row1, index) => (
                                    <>
                                      {
                                        (NumberofCopy =
                                          NumberofCopy + row1.NUMBER_OF_COPY)
                                      }
                                      {
                                        (AvailableCopy =
                                          AvailableCopy + row1.AVAILABLE_COPY)
                                      }
                                      {
                                        (AllNumberofCopy =
                                          AllNumberofCopy + row1.NUMBER_OF_COPY)
                                      }
                                      {
                                        (AllAvailableCopy =
                                          AllAvailableCopy +
                                          row1.AVAILABLE_COPY)
                                      }
                                    </>
                                  )
                                )}
                              </h3>
                              <h4 class="fs-6">Total:{NumberofCopy}</h4>
                              <h4 class="fs-6">Available: {AvailableCopy}</h4>
                              <h3 style={{ display: "none" }}>
                                {(NumberofCopy = 0)}
                                {(AvailableCopy = 0)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                <div class="col-md-12">
                  <div className="card dash-widget ">
                    <div className="card-body">
                      <div class="table-responsive">
                        <table class="table table-bordered mt-4">
                          <thead class="thead-light1">
                            <tr>
                              <th>Total Category</th>
                              <th>Total Unique Book</th>
                              <th>Total Number Of Book Copy</th>
                              <th>Total Number Of Available Book Copy</th>
                              <th>Total Service On Going</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="">
                              <td
                                style={{ background: "#3c423e", color: "#fff" }}
                              >
                                {CategoryData?.length}
                              </td>
                              <td
                                style={{ background: "#00805c", color: "#fff" }}
                              >
                                {BooksData?.length}
                              </td>
                              <td
                                style={{ background: "#1ca88e", color: "#fff" }}
                              >
                                {AllNumberofCopy}
                              </td>
                              <td
                                style={{ background: "#045104", color: "#fff" }}
                              >
                                {AllAvailableCopy}
                              </td>
                              <td
                                style={{ background: "#d74c4c", color: "#fff" }}
                              >
                                {AllNumberofCopy - AllAvailableCopy}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default UserDashBoard;
