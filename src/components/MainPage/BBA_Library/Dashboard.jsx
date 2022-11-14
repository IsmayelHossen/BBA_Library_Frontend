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
import { BaseUrl } from "./CommonUrl";

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const Dashboard = ({ alldata9 }) => {
  console.log(alldata9);
  const [Alldata, setdata] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [isLoader, setisLoader] = useState(true);
  useEffect(() => {
    getDataapicall();
    getDocument();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdata`).then((res) => {
      setfileData(res.data.data);
      setisLoader(false);
      console.log(res.data.data);
    });
  };

  const getDocument = () => {
    axios.get(`${BaseUrl}/documents/categorylist`).then((res) => {
      setdata(res.data.data);
      setisLoader(false);
      console.log(res.data.data);
    });
  };
  const CategoryFileCount = (category) => {
    console.log(category);
    const count = fileData.filter((data) => data.NAME == category);
    console.log(count.length);
    return count.length;
  };
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
                <h3 className="page-title text-start">BBA Archive Dashboard</h3>
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
                    <Link to={`/docs/list`}>
                      <span className="dash-widget-icon">
                        <i className="fa fa-cubes" />
                      </span>

                      <div className="dash-widget-info">
                        <h3>{fileData.length}</h3>
                        <span>Total Files</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-6">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={"/docs/add"}>
                      <span className="dash-widget-icon">
                        <i className="fa fa-user" />
                      </span>
                      <div className="dash-widget-info">
                        <h3>{Alldata.length}</h3>
                        <span>Total Archive Category </span>
                        {Alldata != null &&
                          Alldata.map((row, index) => (
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
                {Alldata != null &&
                  Alldata.map((row, index) => (
                    <>
                      <div className="col-md-4 ">
                        <div className="card dash-widget">
                          <div className="card-body">
                            <span className="dash-widget-icon">
                              <i className="fa fa-usd" />
                            </span>
                            <div className="dash-widget-info">
                              <h3>{CategoryFileCount(row.CATEGORY_NAME)}</h3>
                              <span>{row.CATEGORY_NAME}</span>
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

export default Dashboard;
