/**
 * Signin Firebase
 */

import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

import "../../../index.css";
import { BaseUrl } from "../CommonUrl";

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const DashBoard = ({ alldata9 }) => {
  console.log(alldata9);
  const [CategoryData, setCategoryData] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [isLoader, setisLoader] = useState(true);
  const [BooksData, setBooksData] = useState([]);
  useEffect(() => {
    getBooks();
    getCategory();
  }, []);

  const getBooks = () => {
    axios.get(`${BaseUrl}/library/view/getbooks`).then((res) => {
      console.log(res.data.data);
      setisLoader(false);
      setBooksData(res.data.data);
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
                <h3 className="page-title text-start">BBA Library Dashboard</h3>
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
            <div className="row">
              <div className=" col-md-6 ">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={`/library/view/categories`}>
                      <span className="dash-widget-icon">
                        <i className="fa fa-cubes" />
                      </span>

                      <div className="dash-widget-info">
                        <h3>{CategoryData.length}</h3>
                        <span>Total Category</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-6">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={"/library/view/categories"}>
                      <span className="dash-widget-icon">
                        <i className="fa fa-user" />
                      </span>
                      <div className="dash-widget-info">
                        <h3>{BooksData.length}</h3>
                        <span>Total Unique Book</span>
                        {BooksData != null &&
                          BooksData.map((row, index) => (
                            <>
                              {/* <ul style={{listStyleType:'none'}}>
              <li style={{display:"inline-block"}}>{row.name}</li>
            </ul> */}
                            </>
                          ))}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                {CategoryData != null &&
                  CategoryData.map((row, index) => (
                    <>
                      <div className="col-md-4 ">
                        <div className="card dash-widget">
                          <div className="card-body">
                            <span className="dash-widget-icon">
                              <i className="fa fa-usd" />
                            </span>
                            <div className="dash-widget-info">
                              <h3>
                                {CategoryFileCount(row.CATEGORY_NAME).length}
                              </h3>
                              <span>{row.CATEGORY_NAME}</span>
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
                                    </>
                                  )
                                )}
                              </h3>
                              <h4>Total:{NumberofCopy}</h4>
                              <h4>Available: {AvailableCopy}</h4>
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
              </div>
            </div>
          )}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default DashBoard;
