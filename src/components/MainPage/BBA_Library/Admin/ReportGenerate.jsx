import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */

/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../../index.css";
import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";

import { useReactToPrint } from "react-to-print";
const ReportGenerate = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [PublisherData, setPublisherData] = useState([]);
  const [lastDocId, setlastDocId] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [BooksData, setBooksData] = useState([]);
  const [searchLoader, setsearchLoader] = useState();
  const [printData, setprintData] = useState([]);
  const [ShowBookListTableData, setShowBookListTableData] = useState(false);
  const [ShowBookRequestPendingTableData, setShowBookRequestPendingTableData] =
    useState(false);
  const [ShowBookRequestAccetTableData, setShowBookRequestAccetTableData] =
    useState(false);
  const [ShowBookRentStatusTableData, setShowBookRentStatusTableData] =
    useState(false);
  const [ReportGenerateType, setReportGenerateType] = useState("");
  const [BookRequestPendingprintData, setBookRequestPendingprintData] =
    useState([]);
  const [BookRequestAcceptprintData, setBookRequestAcceptprintData] = useState(
    []
  );
  const [BookRentStatusprintData, setBookRentStatusprintData] = useState([]);
  const booklistfakeLength = [];
  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getCategory();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    reset: reset1,
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  const componentRefBookList = useRef();
  const handlePrintBookList = useReactToPrint({
    content: () => componentRefBookList.current,
  });
  const componentRefPendingBookRequestList = useRef();
  const handlePrintPendingBookRequest = useReactToPrint({
    content: () => componentRefPendingBookRequestList.current,
  });
  const componentRefAcceptBookRequestList = useRef();
  const handlePrintAcceptBookRequest = useReactToPrint({
    content: () => componentRefAcceptBookRequestList.current,
  });

  const componentRefBookRentStatusList = useRef();
  const handlePrintBookRentStatusList = useReactToPrint({
    content: () => componentRefBookRentStatusList.current,
  });

  //get publisher

  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getcategory`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setCategoryData(res.data.data);
    });
  };

  // submit for add publisher
  const onSubmit = (data) => {
    console.log(data);

    if (data.report_type == "BookList") {
      const FilterType = data.category_type.toLowerCase();
      axios
        .get(`${BaseUrl}/library/view/getdataToPrint/${FilterType}`)
        .then((response) => {
          console.log(response.data.data);
          setsearchLoader(false);
          setShowBookListTableData(true);
          setShowBookRequestPendingTableData(false);
          setShowBookRequestAccetTableData(false);
          setShowBookRentStatusTableData(false);
          setprintData(response.data.data);
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "2") {
      const reportType = data.report_type;
      axios
        .get(
          `${BaseUrl}/library/view/getBookRequestPendingDataToPrint/${reportType}`
        )
        .then((response) => {
          console.log(response.data.data);
          setsearchLoader(false);
          setShowBookRequestPendingTableData(true);
          setShowBookListTableData(false);
          setShowBookRequestAccetTableData(false);
          setShowBookRentStatusTableData(false);
          setBookRequestPendingprintData(response.data.data);
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "3") {
      const reportType = data.report_type;
      console.log("accept");
      axios
        .get(
          `${BaseUrl}/library/view/getBookRequestAcceptDataToPrint/${reportType}`
        )
        .then((response) => {
          console.log(response.data.data);
          setsearchLoader(false);
          setShowBookRequestPendingTableData(false);
          setShowBookListTableData(false);
          setShowBookRentStatusTableData(false);
          setShowBookRequestAccetTableData(true);
          setBookRequestAcceptprintData(response.data.data);
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "4") {
      const reportType = data.report_type;
      console.log("status");
      axios
        .get(
          `${BaseUrl}/library/view/getBookRentStatusDataToPrint/${reportType}`
        )
        .then((response) => {
          console.log(response.data.data);
          setsearchLoader(false);
          setShowBookRequestPendingTableData(false);
          setShowBookListTableData(false);
          setShowBookRentStatusTableData(true);
          setShowBookRequestAccetTableData(false);
          setBookRentStatusprintData(response.data.data);
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("another");
    }
  };

  //edit publisher

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    setsearchLoader(true);
    if (search == "") {
      //   getBooks();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/library/search/booksearch/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data);
          setsearchLoader(false);
          setBooksData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //time count

  const timeCount = (toDate) => {
    // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
    var toDate =
      toDate.split("/")[1] +
      "/" +
      toDate.split("/")[0] +
      "/" +
      toDate.split("/")[2];
    var countDownDate = new Date(toDate).getTime();
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    if (distance < 0) {
      return "Expired";
    }

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(distance);
    var day1 = days > 1 ? days + " " + "Days" : days + " " + "Day";
    var hour1 = hours > 1 ? hours + " " + "Hours" : hours + " " + "Hour";

    return day1 + " " + hour1;
  };
  //extratimeCount
  const extratimeCount = (ReleaseDate) => {
    // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

    var ReleaseDate =
      ReleaseDate.split("/")[1] +
      "/" +
      ReleaseDate.split("/")[0] +
      "/" +
      ReleaseDate.split("/")[2];

    var ReleaseDate = new Date(ReleaseDate).getTime();
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = now - ReleaseDate;
    if (distance > 0) {
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      console.log(distance);
      var daytims = days + ":" + hours + ":" + minutes + ":" + seconds;

      var day1 = days > 1 ? days + " " + "Days" : days + " " + "Day";
      var hour1 = hours > 1 ? hours + " " + "Hours" : hours + " " + "Hour";

      return day1 + " " + hour1;
    }
    return 0;
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - BBA Library </title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  BBA Library
                </h4>
              </div>
              {/* header */}

              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control bba_documents-form-control"
                    value={searchdata}
                    name="searchStatus"
                    placeholder="Search"
                    onChange={(e) => SearchData(e)}
                  />
                </div>
                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Report Generate</span>
                </button>
              </div>
            </div>

            <div class="card-body1">
              {/* /Page Header */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                class="form_design_report pt-4"
              >
                <div className="mb-1 row">
                  <label for="inputtext" class="col-sm-4 col-form-label">
                    {" "}
                    <span style={{ color: "red" }}>*</span>
                    Report Type
                  </label>
                  <div className="col-sm-8">
                    <select
                      class=" form-select form-control bba_documents-form-control"
                      name="select_type_toPrint"
                      //   onChange={GetDataToPrint}
                      {...register("report_type", {
                        onChange: (e) => setReportGenerateType(e.target.value),
                      })}
                    >
                      <option value="">Select Report Type</option>
                      <option value="BookList">Book List</option>
                      <option value="2">Book Request Pending List</option>
                      <option value="3">Book Request Accept List</option>
                      <option value="4">Book Rent Status List</option>
                      <option value="5">Book Renew List</option>
                    </select>
                  </div>
                </div>
                {ReportGenerateType && ReportGenerateType == "BookList" && (
                  <>
                    <div className="mb-1 row">
                      <label for="inputtext" class="col-sm-4 col-form-label">
                        {" "}
                        <span style={{ color: "red" }}>*</span>
                        Category
                      </label>
                      <div className="col-sm-8">
                        <select
                          class=" form-select form-control bba_documents-form-control"
                          name="select_type_toPrint"
                          //   onChange={GetDataToPrint}
                          {...register("category_type", {
                            required: false,
                          })}
                        >
                          <option value="">Select Category</option>
                          <option value="All">All</option>
                          {CategoryData &&
                            CategoryData.map((row, index) => (
                              <option value={row.CATEGORY_NAME}>
                                {row.CATEGORY_NAME}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* <div className="mb-1  row">
                  <label for="inputtext" class="col-sm-4 col-form-label">
                    Remark
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      class="form-control bba_documents-form-control"
                      placeholder="Write Remark"
                      // defaultValue={nextDocId}
                      {...register("remark", {
                        required: false,
                      })}
                    />
                  </div>
                </div> */}

                <div className="">
                  <button
                    type="submitupdate"
                    class="Button_primary1 float-right ml-4"
                  >
                    <span>Generate Report</span>
                  </button>
                </div>
              </form>
              {/* printing  functionality start */}
              {/* // booklist print functionality start */}
              {ShowBookListTableData && (
                <>
                  <div ref={componentRefBookList} class="printbooklist">
                    <div class="row">
                      <div class="col-md-2"></div>
                      <div class="col-md-6">
                        <h4 class="text-center mt-3">
                          Bangladesh Bridge Authority Library
                        </h4>
                        <h5>Book List-2022</h5>
                      </div>
                      <div class="col-md-4">
                        <button
                          class="btn btn-success  printBtn"
                          onClick={handlePrintBookList}
                        >
                          Print
                        </button>
                      </div>
                    </div>

                    <div class="mx-auto">
                      <table class="ReportTable">
                        <thead>
                          <tr>
                            <th>Book Serial Number</th>
                            <th>Title</th>
                            <th>Cover Photo</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Place & Publisher</th>
                            <th>Volume & Edition</th>
                            <th>Publication Date</th>
                            <th>Source & Date</th>
                            <th>Page Number</th>
                            <th>Number Of Copy</th>
                            <th>Available Copy</th>
                            <th>Desk Number</th>
                            <th>Desk Floor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {printData &&
                            printData.map((row, index) => (
                              <tr>
                                <td>{row.BOOK_NUM}</td>
                                <td>{row.TITLE}</td>
                                <td>
                                  {" "}
                                  <img
                                    src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                                    width="70"
                                  />
                                </td>
                                <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                                <td>{row.CATEGORY_NAME}</td>
                                <td>
                                  {row.PUBLISHER_NAME
                                    ? row.PUBLISHER_NAME
                                    : "..."}
                                </td>
                                <td>
                                  {row.VOLUME_EDITION
                                    ? row.VOLUME_EDITION
                                    : "..."}
                                </td>
                                <td>
                                  {row.PUBLICATION_DATE
                                    ? row.PUBLICATION_DATE
                                    : "..."}
                                </td>
                                <td>
                                  {row.SOURCE_DATE ? row.SOURCE_DATE : "..."}
                                </td>
                                <td>
                                  {row.PAGE_NUMBER ? row.PAGE_NUMBER : "..."}
                                </td>
                                <td>{row.NUMBER_OF_COPY}</td>
                                <td>{row.AVAILABLE_COPY}</td>
                                <td>
                                  {row.DESK_NUMBER ? row.DESK_NUMBER : "..."}
                                </td>
                                <td>{row.DESK_FLOOR}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {/* // booklist print functionality end*/}
              {/* bookrequest Pending Functionality start */}
              {ShowBookRequestPendingTableData && (
                <div
                  ref={componentRefPendingBookRequestList}
                  class="printbookPendingRequestlist"
                >
                  <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-6">
                      <h4 class="text-center mt-3">
                        Bangladesh Bridge Authority Library
                      </h4>
                      <h5>Book Request Pending List-2022</h5>
                    </div>
                    <div class="col-md-4">
                      <button
                        class="btn btn-success  printBtn"
                        onClick={handlePrintPendingBookRequest}
                      >
                        Print
                      </button>
                    </div>
                  </div>

                  <div class="mx-auto">
                    <table class="ReportTable">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Requested Date</th>
                          <th>Book Serial Number</th>
                          <th>Title</th>
                          <th>Cover Photo</th>
                          <th>Author</th>
                          <th>Category</th>
                          <th>Place & Publisher</th>
                          <th>Volume & Edition</th>
                          <th>Publication Date</th>
                          <th>Source & Date</th>
                          <th>Page Number</th>
                          <th>Number Of Copy</th>
                          <th>Available Copy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BookRequestPendingprintData &&
                          BookRequestPendingprintData.map((row, index) => (
                            <tr>
                              <td>{row.NAME}</td>
                              <td>{row.REQUEST_DATE}</td>
                              <td>{row.BOOK_NUM}</td>
                              <td>{row.TITLE}</td>
                              <td>
                                {" "}
                                <img
                                  src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                                  width="70"
                                />
                              </td>
                              <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                              <td>{row.CATEGORY_NAME}</td>
                              <td>
                                {row.PUBLISHER_NAME
                                  ? row.PUBLISHER_NAME
                                  : "..."}
                              </td>
                              <td>
                                {row.VOLUME_EDITION
                                  ? row.VOLUME_EDITION
                                  : "..."}
                              </td>
                              <td>
                                {row.PUBLICATION_DATE
                                  ? row.PUBLICATION_DATE
                                  : "..."}
                              </td>
                              <td>
                                {row.SOURCE_DATE ? row.SOURCE_DATE : "..."}
                              </td>
                              <td>
                                {row.PAGE_NUMBER ? row.PAGE_NUMBER : "..."}
                              </td>
                              <td>{row.NUMBER_OF_COPY}</td>
                              <td>{row.AVAILABLE_COPY}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* bookrequest Pending Functionality end */}
              {/* bookrequest accept functionality start*/}
              {ShowBookRequestAccetTableData && (
                <div
                  ref={componentRefAcceptBookRequestList}
                  class="printbookPendingRequestlist"
                >
                  <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-6">
                      <h4 class="text-center mt-3">
                        Bangladesh Bridge Authority Library
                      </h4>
                      <h5>Book Request Accept List-2022</h5>
                    </div>
                    <div class="col-md-4">
                      <button
                        class="btn btn-success  printBtn"
                        onClick={handlePrintAcceptBookRequest}
                      >
                        Print
                      </button>
                    </div>
                  </div>

                  <div class="mx-auto">
                    <table class="ReportTable">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Requested Date</th>
                          <th>Book Serial Number</th>
                          <th>Title</th>
                          <th>Cover Photo</th>
                          <th>Author</th>
                          <th>Category</th>
                          <th>Place & Publisher</th>
                          <th>Volume & Edition</th>
                          <th>Publication Date</th>
                          <th>Source & Date</th>
                          <th>Page Number</th>
                          <th>Number Of Copy</th>
                          <th>Available Copy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BookRequestAcceptprintData &&
                          BookRequestAcceptprintData.map((row, index) => (
                            <tr>
                              <td>{row.NAME}</td>
                              <td>{row.REQUEST_DATE}</td>
                              <td>{row.BOOK_NUM}</td>
                              <td>{row.TITLE}</td>
                              <td>
                                {" "}
                                <img
                                  src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                                  width="70"
                                />
                              </td>
                              <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                              <td>{row.CATEGORY_NAME}</td>
                              <td>
                                {row.PUBLISHER_NAME
                                  ? row.PUBLISHER_NAME
                                  : "..."}
                              </td>
                              <td>
                                {row.VOLUME_EDITION
                                  ? row.VOLUME_EDITION
                                  : "..."}
                              </td>
                              <td>
                                {row.PUBLICATION_DATE
                                  ? row.PUBLICATION_DATE
                                  : "..."}
                              </td>
                              <td>
                                {row.SOURCE_DATE ? row.SOURCE_DATE : "..."}
                              </td>
                              <td>
                                {row.PAGE_NUMBER ? row.PAGE_NUMBER : "..."}
                              </td>
                              <td>{row.NUMBER_OF_COPY}</td>
                              <td>{row.AVAILABLE_COPY}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* bookrequest accept funnctonality end */}
              {/* book rent status list */}
              {ShowBookRentStatusTableData && (
                <div
                  ref={componentRefBookRentStatusList}
                  class="printbookPendingRequestlist"
                >
                  <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-6">
                      <h4 class="text-center mt-3">
                        Bangladesh Bridge Authority Library
                      </h4>
                      <h5>Book Rent Status List-2022</h5>
                    </div>
                    <div class="col-md-4">
                      <button
                        class="btn btn-success  printBtn"
                        onClick={handlePrintBookRentStatusList}
                      >
                        Print
                      </button>
                    </div>
                  </div>

                  <div class="mx-auto">
                    <table class="ReportTable">
                      <thead>
                        <tr>
                          <th>User</th>

                          <th>Book Serial Number</th>
                          <th>Title</th>
                          <th>Cover Photo</th>
                          <th>Author</th>
                          <th>Category</th>

                          <th>Page Number</th>
                          <th>Number Of Copy</th>
                          <th>Available Copy</th>
                          <th>Issued Date</th>
                          <th>Release Date</th>
                          <th>Time Left</th>
                          <th>Time Delay</th>
                          <th>Receive Date</th>
                          <th>Status</th>
                          <th>Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BookRentStatusprintData &&
                          BookRentStatusprintData.map((row, index) => (
                            <tr>
                              <td>{row.NAME}</td>

                              <td>{row.BOOK_NUM}</td>
                              <td>{row.TITLE}</td>

                              <td>
                                {" "}
                                <img
                                  src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                                  width="70"
                                />
                              </td>
                              <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                              <td>{row.CATEGORY_NAME}</td>

                              <td>
                                {row.PAGE_NUMBER ? row.PAGE_NUMBER : "..."}
                              </td>
                              <td>{row.NUMBER_OF_COPY}</td>
                              <td>{row.AVAILABLE_COPY}</td>
                              <td>{row.ISSUE_DATE}</td>
                              <td>{row.RELEASE_DATE}</td>
                              <td>
                                {" "}
                                {row.STATUS != "Release"
                                  ? timeCount(row.RELEASE_DATE)
                                  : "..."}
                              </td>
                              <td>
                                {row.STATUS != "Release" ? (
                                  <p class="delayTimeAnimated">
                                    {extratimeCount(row.RELEASE_DATE)}
                                  </p>
                                ) : (
                                  "..."
                                )}
                              </td>
                              <td>{row.RECEIVE_DATE}</td>
                              <td>
                                {row.STATUS == "Release" ? (
                                  <p class="btn btn-success btn-sm">
                                    <i
                                      class="fa fa-check"
                                      aria-hidden="true"
                                    ></i>
                                  </p>
                                ) : (
                                  <p>{row.STATUS}</p>
                                )}
                              </td>
                              <td>{row.REMARK1}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* book rent status list end */}
              {/* printing functionality end */}{" "}
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default ReportGenerate;
