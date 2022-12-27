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
import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";

import { useReactToPrint } from "react-to-print";
const ReportGenerate = () => {
  const [DataLoader, setDataLoader] = useState(false);
  const [searchdata, setsearchdata] = useState([]);

  const [UpdateId, setUpdateId] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  const [BooksData, setBooksData] = useState([]);
  const [searchLoader, setsearchLoader] = useState();
  const [printbookData, setprintbookData] = useState([]);
  const [employeeData, setemployeeData] = useState([]);
  const [ShowBookListTableData, setShowBookListTableData] = useState(false);
  const [ShowBookRequestPendingTableData, setShowBookRequestPendingTableData] =
    useState(false);
  const [ShowBookRequestAccetTableData, setShowBookRequestAccetTableData] =
    useState(false);
  const [ShowBookRentStatusTableData, setShowBookRentStatusTableData] =
    useState(false);
  const [ShowBookRenewStatusTableData, setShowBookRenewStatusTableData] =
    useState(false);
  const [ShowUserReportLibraryData, setShowUserReportLibraryData] =
    useState(false);
  const [
    ShowUserReportLibraryIndivdualRentData,
    setShowUserReportLibraryIndivdualRentData,
  ] = useState(false);
  const [
    ShowUserReportLibraryIndivdualRenewData,
    setShowUserReportLibraryIndivdualRenewData,
  ] = useState(false);
  const [ReportGenerateType, setReportGenerateType] = useState("");
  const [BookRequestPendingprintData, setBookRequestPendingprintData] =
    useState([]);
  const [BookRequestAcceptprintData, setBookRequestAcceptprintData] = useState(
    []
  );
  const [BookRentStatusprintData, setBookRentStatusprintData] = useState([]);
  const [BookRenewStatusprintData, setBookRenewStatusprintData] = useState([]);
  const [BookRenewStatusprintDataRepeat, setBookRenewStatusprintDataRepeat] =
    useState([]);
  const [BookUserIndividualprintData, setBookUserIndividualprintData] =
    useState([]);
  const [BookUserIndividualRentprintData, setBookUserIndividualRentprintData] =
    useState([]);
  const [
    BookUserIndividualRenewprintData,
    setBookUserIndividualRenewprintData,
  ] = useState([]);
  const [
    BookUserIndividualRenewUniqueprintData,
    setBookUserIndividualRenewUniqueprintData,
  ] = useState([]);
  const booklistfakeLength = [];
  const [IndividualReportType, setIndividualReportType] = useState("");
  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getCategory();
    getEmployees();
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
  const componentRefBookRenewStatusList = useRef();
  const handlePrintBookRenewStatusList = useReactToPrint({
    content: () => componentRefBookRenewStatusList.current,
  });

  const componentRefBookIndividualStatusList = useRef();
  const handlePrintBookIndividualReportStatusList = useReactToPrint({
    content: () => componentRefBookIndividualStatusList.current,
  });

  const componentRefBookIndividualRentList = useRef();
  const handlePrintBookIndividualRentStatusList = useReactToPrint({
    content: () => componentRefBookIndividualRentList.current,
  });

  const componentRefBookIndividualRenewList = useRef();
  const handlePrintBookIndividualRenewStatusList = useReactToPrint({
    content: () => componentRefBookIndividualRenewList.current,
  });

  //get publisher

  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getcategory`).then((res) => {
      setDataLoader(false);
      setCategoryData(res.data.data);
    });
  };
  //get employees
  const getEmployees = () => {
    axios.get(`${BaseUrl}/library/view/getEmployeeData`).then((res) => {
      setDataLoader(false);
      setemployeeData(res.data.data);
    });
  };
  // submit for add publisher
  const onSubmit = (data) => {
    if (data.report_type == "BookList") {
      setDataLoader(true);
      const FilterType = data.category_type.toLowerCase();
      axios
        .get(`${BaseUrl}/library/view/getdataToPrint/${FilterType}`)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.data);
            setsearchLoader(false);
            setDataLoader(false);
            setShowBookListTableData(true);
            setShowBookRequestPendingTableData(false);
            setShowBookRequestAccetTableData(false);
            setShowBookRentStatusTableData(false);
            setShowBookRenewStatusTableData(false);
            setShowUserReportLibraryData(false);
            setShowUserReportLibraryIndivdualRentData(false);
            setprintbookData(response.data.data);
            setShowUserReportLibraryIndivdualRenewData(false);
          }
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "2") {
      const reportType = data.report_type;
      setDataLoader(true);
      axios
        .get(
          `${BaseUrl}/library/view/getBookRequestPendingDataToPrint/${reportType}`
        )
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.data);
            setsearchLoader(false);
            setDataLoader(false);
            setShowBookRequestPendingTableData(true);
            setShowBookListTableData(false);
            setShowBookRequestAccetTableData(false);
            setShowBookRentStatusTableData(false);
            setShowBookRenewStatusTableData(false);
            setShowUserReportLibraryData(false);
            setShowUserReportLibraryIndivdualRentData(false);
            setBookRequestPendingprintData(response.data.data);
            setShowUserReportLibraryIndivdualRenewData(false);
          }
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "3") {
      const reportType = data.report_type;
      setDataLoader(true);
      axios
        .get(
          `${BaseUrl}/library/view/getBookRequestAcceptDataToPrint/${reportType}`
        )
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            setsearchLoader(false);
            setDataLoader(false);
            setShowBookRequestPendingTableData(false);
            setShowBookListTableData(false);
            setShowBookRentStatusTableData(false);
            setShowBookRequestAccetTableData(true);
            setShowBookRenewStatusTableData(false);
            setShowUserReportLibraryData(false);
            setShowUserReportLibraryIndivdualRentData(false);
            setBookRequestAcceptprintData(response.data.data);
            setShowUserReportLibraryIndivdualRenewData(false);
          }
          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "4") {
      const reportType = data.report_type;
      console.log("status");
      setDataLoader(true);
      axios
        .get(
          `${BaseUrl}/library/view/getBookRentStatusDataToPrint/${reportType}`
        )
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            setsearchLoader(false);
            setDataLoader(false);
            setShowBookRequestPendingTableData(false);
            setShowBookListTableData(false);
            setShowBookRentStatusTableData(true);
            setShowBookRequestAccetTableData(false);
            setShowBookRenewStatusTableData(false);
            setShowUserReportLibraryData(false);
            setShowUserReportLibraryIndivdualRentData(false);
            setBookRentStatusprintData(response.data.data);
            setShowUserReportLibraryIndivdualRenewData(false);
          }

          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (data.report_type == "6") {
      console.log(data);
      const reportType = Number(data.type);
      setIndividualReportType(reportType);
      const emp_id = Number(data.emp_id);
      if (3 == reportType) {
        setDataLoader(true);
        axios
          .get(
            `${BaseUrl}/library/view/getBookIndividualUserRentDataToPrint/${reportType}/${emp_id}`
          )
          .then((response) => {
            console.log(response.data.data);
            if (response.data.success) {
              setsearchLoader(false);
              setDataLoader(false);
              setShowBookRequestPendingTableData(false);
              setShowBookListTableData(false);
              setShowBookRentStatusTableData(false);
              setShowBookRequestAccetTableData(false);
              setShowBookRenewStatusTableData(false);
              setShowUserReportLibraryData(false);
              setShowUserReportLibraryIndivdualRentData(true);
              setBookUserIndividualRentprintData(response.data.data);
              setShowUserReportLibraryIndivdualRenewData(false);
            }

            // reset();
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (4 == reportType) {
        setDataLoader(true);
        axios
          .get(
            `${BaseUrl}/library/view/getBookIndividualUserRenewDataToPrint/${reportType}/${emp_id}`
          )
          .then((response) => {
            console.log(response.data.data);
            if (response.data.success) {
              setsearchLoader(false);
              setDataLoader(false);
              setShowBookRequestPendingTableData(false);
              setShowBookListTableData(false);
              setShowBookRentStatusTableData(false);
              setShowBookRequestAccetTableData(false);
              setShowBookRenewStatusTableData(false);
              setShowUserReportLibraryData(false);
              setShowUserReportLibraryIndivdualRentData(false);
              setBookUserIndividualRenewprintData(response.data.data);
              setShowUserReportLibraryIndivdualRenewData(true);

              const unique = [
                ...new Map(
                  response.data.data.map((m) => [m.BOOKRENT_ID, m])
                ).values(),
              ];

              setBookUserIndividualRenewUniqueprintData(unique);
            }

            // reset();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setDataLoader(true);
        axios
          .get(
            `${BaseUrl}/library/view/getBookIndividualUserLibraryDataToPrint/${reportType}/${emp_id}`
          )
          .then((response) => {
            console.log(response.data.data);
            if (response.data.success) {
              setsearchLoader(false);
              setDataLoader(false);
              setShowBookRequestPendingTableData(false);
              setShowBookListTableData(false);
              setShowBookRentStatusTableData(false);
              setShowBookRequestAccetTableData(false);
              setShowBookRenewStatusTableData(false);
              setShowUserReportLibraryData(true);
              setShowUserReportLibraryIndivdualRentData(false);
              setBookUserIndividualprintData(response.data.data);
              setShowUserReportLibraryIndivdualRenewData(false);
            }

            // reset();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      const reportType = data.report_type;
      setDataLoader(true);
      axios
        .get(
          `${BaseUrl}/library/view/getBookRenewStatusDataToPrint/${reportType}`
        )
        .then((response) => {
          if (response.data.success) {
            setsearchLoader(false);
            setDataLoader(false);
            setShowBookRequestPendingTableData(false);
            setShowBookListTableData(false);
            setShowBookRentStatusTableData(false);
            setShowBookRequestAccetTableData(false);
            setShowBookRenewStatusTableData(true);
            setBookRenewStatusprintDataRepeat(response.data.data);
            setShowUserReportLibraryIndivdualRenewData(false);

            const unique = [
              ...new Map(
                response.data.data.map((m) => [m.BOOKRENT_ID, m])
              ).values(),
            ];

            setBookRenewStatusprintData(unique);
          }

          // reset();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //edit publisher

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value.replace(/[^\w]/gi, "");
    const type = "nothing demo";
    setsearchLoader(true);
    if (search === "") {
      axios
        .get(`${BaseUrl}/library/view/getBookRentStatusDataToPrint/${type}`)
        .then((res) => {
          setBookRentStatusprintData(res.data.data);
        });
    } else {
      const searchby_lowercase = search.toLowerCase();
      const bookrentSearch = BookRentStatusprintData.filter((data) => {
        const type =
          data.STATUS +
          " " +
          data.BOOK_NUM +
          " " +
          data.OLD_BOOK_NO_1 +
          " " +
          data.TITLE +
          " " +
          data.CATEGORY_NAME +
          " " +
          data.AUTHOR +
          " " +
          data.NAME;

        return type.toLowerCase().includes(`${searchby_lowercase}`);
      });
      setBookRentStatusprintData(bookrentSearch);
      console.log(BookRentStatusprintData);
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
      <div></div>

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
                <p></p>
                <button type="button" class="Button_success float-right">
                  <span>Report Generate</span>
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
                      <option value="6">Individual</option>
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
                {ReportGenerateType && ReportGenerateType === "6" && (
                  <>
                    <div className="mb-1 row">
                      <label for="inputtext" class="col-sm-4 col-form-label">
                        {" "}
                        <span style={{ color: "red" }}>*</span>
                        User
                      </label>
                      <div className="col-sm-8">
                        <select
                          class=" form-select form-control bba_documents-form-control"
                          name="select_type_toPrint"
                          //   onChange={GetDataToPrint}
                          {...register("emp_id", {
                            required: false,
                          })}
                        >
                          <option value="">Select Employee </option>

                          {employeeData.length &&
                            employeeData.map((row, index) => (
                              <option value={row.ID}>
                                {row.NAME}({row.DESIGNATION})
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-1 row">
                      <label for="inputtext" class="col-sm-4 col-form-label">
                        {" "}
                        <span style={{ color: "red" }}>*</span>
                        Type
                      </label>
                      <div className="col-sm-8">
                        <select
                          class=" form-select form-control bba_documents-form-control"
                          name="select_type_toPrint"
                          //   onChange={GetDataToPrint}
                          {...register("type", {
                            required: false,
                          })}
                        >
                          <option value="">Type </option>

                          <option value="1">Book Request Pending List</option>
                          <option value="2">Book Request Accept List</option>
                          <option value="3">Book Rent Status List</option>
                          <option value="4">Book Renew List</option>
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

              {DataLoader ? (
                <p>Report Generating.....</p>
              ) : (
                <>
                  {/* printing  functionality start */}
                  {/* // booklist print functionality start */}
                  {ShowBookListTableData && (
                    <>
                      <div ref={componentRefBookList} class="printbooklist">
                        <div class="row">
                          <div class="col-md-2"></div>
                          <div class="col-md-8"></div>
                          <div class="col-md-2">
                            <button
                              class="btn btn-success  printBtn"
                              onClick={handlePrintBookList}
                            >
                              Print
                            </button>
                          </div>
                        </div>

                        <div class="mx-auto">
                          <table class="ReportTable mt-2 ">
                            <center></center>
                            <thead>
                              <tr class="table_caption_when_print">
                                <th colSpan={16}>
                                  {" "}
                                  <h4 class="text-center ">
                                    Bangladesh Bridge Authority Library
                                  </h4>
                                  <h5>Book List-{new Date().getFullYear()}</h5>
                                </th>
                              </tr>
                              <tr>
                                <th>Book Serial Number</th>
                                <th>Book Old Number</th>
                                <th>Sequence Number</th>
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
                                <th>Desk</th>
                              </tr>
                            </thead>
                            <tbody>
                              {printbookData.length &&
                                printbookData.map((row, index) => (
                                  <tr>
                                    <td>{row.BOOK_NUM}</td>
                                    <td>
                                      {row.OLD_BOOK_NO?.replace(/,/g, "  ")}
                                    </td>
                                    <td>
                                      {row.SEQ_NUMBER?.replace(/,/g, "  ")}
                                    </td>
                                    <td>{row.TITLE}</td>
                                    <td>
                                      {" "}
                                      <img
                                        src={
                                          row.IMAGE == null
                                            ? ""
                                            : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                        }
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
                                      {row.SOURCE_DATE
                                        ? row.SOURCE_DATE
                                        : "..."}
                                    </td>
                                    <td>
                                      {row.PAGE_NUMBER
                                        ? row.PAGE_NUMBER
                                        : "..."}
                                    </td>
                                    <td>{row.NUMBER_OF_COPY}</td>
                                    <td>{row.AVAILABLE_COPY}</td>
                                    <td>
                                      Number:
                                      {row.DESK_NUMBER
                                        ? row.DESK_NUMBER
                                        : "..."}
                                      <br />
                                      Floor:{row.DESK_FLOOR}
                                    </td>
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

                        <div class="col-md-8 page-header">
                          {/* <h4 class="text-center mt-3">
                            Bangladesh Bridge Authority Library
                          </h4>
                          <h5>Book Request Pending List-2022</h5> */}
                        </div>
                        <div class="col-md-2">
                          <button
                            class="btn btn-success  printBtn"
                            onClick={handlePrintPendingBookRequest}
                          >
                            Print
                          </button>
                        </div>
                      </div>

                      <div class="mx-auto">
                        <table class="ReportTable report-container">
                          <thead>
                            <tr class="table_caption_when_print">
                              <th colSpan={14}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  Book Request Pending List-
                                  {new Date().getFullYear()}
                                </h5>
                              </th>
                            </tr>
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
                            <>
                              {BookRequestPendingprintData.length &&
                                BookRequestPendingprintData.map(
                                  (row, index) => (
                                    <>
                                      <tr>
                                        <td>
                                          {row.NAME}({row.DESIGNATION})
                                        </td>
                                        <td>{row.REQUEST_DATE}</td>
                                        <td>{row.BOOK_NUM}</td>

                                        <td>{row.TITLE}</td>
                                        <td>
                                          {" "}
                                          <img
                                            src={
                                              row.IMAGE == null
                                                ? ""
                                                : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                            }
                                            width="70"
                                          />
                                        </td>
                                        <td>
                                          {row.AUTHOR ? row.AUTHOR : "..."}
                                        </td>
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
                                          {row.SOURCE_DATE
                                            ? row.SOURCE_DATE
                                            : "..."}
                                        </td>
                                        <td>
                                          {row.PAGE_NUMBER
                                            ? row.PAGE_NUMBER
                                            : "..."}
                                        </td>
                                        <td>{row.NUMBER_OF_COPY}</td>
                                        <td>{row.AVAILABLE_COPY}</td>
                                      </tr>
                                    </>
                                  )
                                )}
                            </>
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
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
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
                            <tr class="table_caption_when_print">
                              <th colSpan={14}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  Book Request Accept List-
                                  {new Date().getFullYear()}
                                </h5>
                              </th>
                            </tr>

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
                            {BookRequestAcceptprintData.length &&
                              BookRequestAcceptprintData.map((row, index) => (
                                <tr>
                                  <td>
                                    {row.NAME}({row.DESIGNATION})
                                  </td>
                                  <td>{row.REQUEST_DATE}</td>
                                  <td>{row.BOOK_NUM}</td>
                                  <td>{row.TITLE}</td>
                                  <td>
                                    {" "}
                                    <img
                                      src={
                                        row.IMAGE == null
                                          ? ""
                                          : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                      }
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
                        <div class="col-md-2">
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
                        </div>
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
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
                            <tr class="table_caption_when_print">
                              <th colSpan={14}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  Book Rent Status List-
                                  {new Date().getFullYear()}
                                </h5>
                              </th>
                            </tr>
                            <tr>
                              <th>User</th>

                              <th>Book Serial Number</th>
                              <th>Old Book Number</th>
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
                            {BookRentStatusprintData.length &&
                              BookRentStatusprintData.map((row, index) => (
                                <tr>
                                  <td>
                                    {row.NAME}({row.DESIGNATION})
                                  </td>

                                  <td>{row.BOOK_NUM}</td>
                                  <td>{row.OLD_BOOK_NO_1}</td>
                                  <td>{row.TITLE}</td>

                                  <td>
                                    {" "}
                                    <img
                                      src={
                                        row.IMAGE == null
                                          ? ""
                                          : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                      }
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
                                    {row.STATUS !== "Release"
                                      ? timeCount(row.RELEASE_DATE)
                                      : "..."}
                                  </td>
                                  <td>
                                    {row.STATUS !== "Release" ? (
                                      <span class="delayTimeAnimated">
                                        {extratimeCount(row.RELEASE_DATE)}
                                      </span>
                                    ) : (
                                      "..."
                                    )}
                                  </td>
                                  <td>{row.RECEIVE_DATE}</td>
                                  <td>
                                    {row.STATUS === "Release" ? (
                                      <span class="btn btn-success btn-sm">
                                        <i
                                          class="fa fa-check"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    ) : (
                                      <span>{row.STATUS}</span>
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
                  {/* book renew status list */}
                  {ShowBookRenewStatusTableData && (
                    <div
                      ref={componentRefBookRenewStatusList}
                      class="printbookPendingRequestlist"
                    >
                      <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
                          <button
                            class="btn btn-success  printBtn"
                            onClick={handlePrintBookRenewStatusList}
                          >
                            Print
                          </button>
                        </div>
                      </div>

                      <div class="mx-auto">
                        <table class="ReportTable">
                          <thead>
                            <tr class="table_caption_when_print">
                              <th colSpan={14}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  Book Renew Status List-
                                  {new Date().getFullYear()}
                                </h5>
                              </th>
                            </tr>
                            <tr>
                              <th>User</th>

                              <th>Book Serial Number</th>
                              <th>Title</th>
                              <th>Cover Photo</th>
                              <th>Author</th>
                              <th>Category</th>

                              <th>Page Number</th>

                              <th class="text-center">Renew Status</th>

                              <th>Time Left</th>
                              <th>Time Delay</th>
                              <th>Receive Date</th>
                              <th>Status</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {BookRenewStatusprintData.length &&
                              BookRenewStatusprintData.map((row, index) => (
                                <tr>
                                  <td>
                                    {row.NAME}({row.DESIGNATION})
                                  </td>

                                  <td>{row.BOOK_NUM}</td>
                                  <td>{row.TITLE}</td>

                                  <td>
                                    {" "}
                                    <img
                                      src={
                                        row.IMAGE == null
                                          ? ""
                                          : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                      }
                                      width="70"
                                    />
                                  </td>
                                  <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                                  <td>{row.CATEGORY_NAME}</td>

                                  <td>
                                    {row.PAGE_NUMBER ? row.PAGE_NUMBER : "..."}
                                  </td>
                                  <td>
                                    <table class="book_renew_repeated_table">
                                      <tr>
                                        <th>Sent Requeste Date</th>
                                        <th>Previous Release Date</th>
                                        <th>Requested New Release Date</th>
                                        <th>Status</th>
                                        <th>Remark</th>
                                      </tr>

                                      <tbody>
                                        {BookRenewStatusprintDataRepeat &&
                                          BookRenewStatusprintDataRepeat.map(
                                            (rowchild, index) => (
                                              <tr>
                                                <>
                                                  {rowchild.BOOKRENT_ID ==
                                                    row.BOOKRENT_ID && (
                                                    <>
                                                      <td>
                                                        {rowchild.REQUEST_DATE}
                                                      </td>
                                                      <td>
                                                        {
                                                          rowchild.PRE_RELEASE_DATE
                                                        }
                                                      </td>
                                                      <td>
                                                        {
                                                          rowchild.NEW_RELEASE_DATE
                                                        }
                                                      </td>
                                                      <td>
                                                        {rowchild.STATUS == 0
                                                          ? "Pending"
                                                          : rowchild.STATUS == 1
                                                          ? "Accept"
                                                          : "Declined"}
                                                      </td>
                                                      <td>
                                                        {rowchild.REMARK3
                                                          ? rowchild.REMARK3
                                                          : "..."}
                                                      </td>
                                                    </>
                                                  )}
                                                </>
                                              </tr>
                                            )
                                          )}
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    {" "}
                                    {row.STATUS !== "Release"
                                      ? timeCount(row.RELEASE_DATE)
                                      : "..."}
                                  </td>
                                  <td>
                                    {row.STATUS !== "Release" ? (
                                      <span class="delayTimeAnimated">
                                        {extratimeCount(row.RELEASE_DATE)}
                                      </span>
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
                                      <p>{row.STATUS_1}</p>
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
                  {/* book renew status list end */}
                  {/*individual book report status list start */}
                  {ShowUserReportLibraryData && (
                    <div
                      ref={componentRefBookIndividualStatusList}
                      class="printbookPendingRequestlist"
                    >
                      <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
                          <button
                            class="btn btn-success  printBtn"
                            onClick={handlePrintBookIndividualReportStatusList}
                          >
                            Print
                          </button>
                        </div>
                      </div>

                      <div class="mx-auto">
                        <table class="ReportTable">
                          <thead>
                            <tr class="table_caption_when_print">
                              <th colSpan={14}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  Book{" "}
                                  {IndividualReportType &&
                                  IndividualReportType == 1
                                    ? "Pending"
                                    : "Accepted"}{" "}
                                  Status List-{new Date().getFullYear()} for{" "}
                                  {BookUserIndividualprintData.length &&
                                    BookUserIndividualprintData.slice(0, 1).map(
                                      (row) => (
                                        <>
                                          {row.NAME}-({row.DESIGNATION})
                                        </>
                                      )
                                    )}{" "}
                                </h5>
                              </th>
                            </tr>
                            <tr>
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
                            {BookUserIndividualprintData.length &&
                              BookUserIndividualprintData.map((row, index) => (
                                <tr>
                                  <td>{row.REQUEST_DATE}</td>
                                  <td>{row.BOOK_NUM}</td>
                                  <td>{row.TITLE}</td>
                                  <td>
                                    {" "}
                                    <img
                                      src={
                                        row.IMAGE == null
                                          ? ""
                                          : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                      }
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
                  {/* book report individual status list end */}
                  {/*individual book rent report status list start */}
                  {ShowUserReportLibraryIndivdualRentData && (
                    <div
                      ref={componentRefBookIndividualRentList}
                      class="printbookPendingRequestlist"
                    >
                      <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
                          <button
                            class="btn btn-success  printBtn"
                            onClick={handlePrintBookIndividualRentStatusList}
                          >
                            Print
                          </button>
                        </div>
                      </div>

                      <div class="mx-auto">
                        <table class="ReportTable">
                          <thead>
                            <tr class="table_caption_when_print">
                              <th colSpan={14}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  {" "}
                                  Book Rent Status List-
                                  {new Date().getFullYear()} For{" "}
                                  {BookUserIndividualRentprintData.length &&
                                    BookUserIndividualRentprintData.slice(
                                      0,
                                      1
                                    ).map((row) => (
                                      <>
                                        {row.NAME}-({row.DESIGNATION})
                                      </>
                                    ))}{" "}
                                </h5>
                              </th>
                            </tr>
                            <tr>
                              <th>Book Serial Number</th>
                              <th>Old Book Number</th>
                              <th>Title</th>
                              <th>Cover Photo</th>
                              <th>Author</th>
                              <th>Category</th>
                              <th>Page Number</th>
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
                            {BookUserIndividualRentprintData.length &&
                              BookUserIndividualRentprintData.map(
                                (row, index) => (
                                  <tr>
                                    <td>{row.BOOK_NUM}</td>
                                    <td>{row.OLD_BOOK_NO}</td>
                                    <td>{row.TITLE}</td>

                                    <td>
                                      {" "}
                                      <img
                                        src={
                                          row.IMAGE == null
                                            ? ""
                                            : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                        }
                                        width="70"
                                      />
                                    </td>
                                    <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                                    <td>{row.CATEGORY_NAME}</td>

                                    <td>
                                      {row.PAGE_NUMBER
                                        ? row.PAGE_NUMBER
                                        : "..."}
                                    </td>

                                    <td>{row.ISSUE_DATE}</td>
                                    <td>{row.RELEASE_DATE}</td>
                                    <td>
                                      {" "}
                                      {row.STATUS !== "Release"
                                        ? timeCount(row.RELEASE_DATE)
                                        : "..."}
                                    </td>
                                    <td>
                                      {row.STATUS !== "Release" ? (
                                        <span class="delayTimeAnimated">
                                          {extratimeCount(row.RELEASE_DATE)}
                                        </span>
                                      ) : (
                                        "..."
                                      )}
                                    </td>
                                    <td>{row.RECEIVE_DATE}</td>
                                    <td>
                                      {row.STATUS === "Release" ? (
                                        <span class="btn btn-success btn-sm">
                                          <i
                                            class="fa fa-check"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      ) : (
                                        <span>{row.STATUS}</span>
                                      )}
                                    </td>
                                    <td>{row.REMARK1}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* book report individual status list end */}
                  {/*individual book renew report status list start */}
                  {ShowUserReportLibraryIndivdualRenewData && (
                    <div
                      ref={componentRefBookIndividualRenewList}
                      class="printbookPendingRequestlist"
                    >
                      <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
                          <button
                            class="btn btn-success  printBtn"
                            onClick={handlePrintBookIndividualRenewStatusList}
                          >
                            Print
                          </button>
                        </div>
                      </div>

                      <div class="mx-auto">
                        <table class="ReportTable">
                          <thead>
                            <tr class="table_caption_when_print">
                              <th colSpan={17}>
                                {" "}
                                <h4 class="text-center ">
                                  Bangladesh Bridge Authority Library
                                </h4>
                                <h5>
                                  {" "}
                                  Book Renew Status List-
                                  {new Date().getFullYear()} For{" "}
                                  {BookUserIndividualRenewprintData.length &&
                                    BookUserIndividualRenewprintData.slice(
                                      0,
                                      1
                                    ).map((row) => (
                                      <>
                                        {row.NAME}-({row.DESIGNATION})
                                      </>
                                    ))}{" "}
                                </h5>
                              </th>
                            </tr>
                            <tr>
                              <th>Book Serial Number</th>
                              <th>Old Book Number</th>
                              <th>Title</th>
                              <th>Cover Photo</th>
                              <th>Author</th>
                              <th>Category</th>

                              <th>Page Number</th>

                              <th class="text-center">Renew Status</th>

                              <th>Time Left</th>
                              <th>Time Delay</th>
                              <th>Receive Date</th>
                              <th>Status</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {BookUserIndividualRenewUniqueprintData.length &&
                              BookUserIndividualRenewUniqueprintData.map(
                                (row, index) => (
                                  <tr>
                                    <td>{row.BOOK_NUM}</td>
                                    <td>{row.OLD_BOOK_NO_1}</td>
                                    <td>{row.TITLE}</td>

                                    <td>
                                      {" "}
                                      <img
                                        src={
                                          row.IMAGE == null
                                            ? ""
                                            : `${BaseUrl}/uploadDoc/${row.IMAGE}`
                                        }
                                        width="70"
                                      />
                                    </td>
                                    <td>{row.AUTHOR ? row.AUTHOR : "..."}</td>
                                    <td>{row.CATEGORY_NAME}</td>

                                    <td>
                                      {row.PAGE_NUMBER
                                        ? row.PAGE_NUMBER
                                        : "..."}
                                    </td>
                                    <td>
                                      <table class="book_renew_repeated_table">
                                        <tr>
                                          <th>Sent Requeste Date</th>
                                          <th>Previous Release Date</th>
                                          <th>Requested New Release Date</th>
                                          <th>Status</th>
                                          <th>Remark</th>
                                        </tr>

                                        <tbody>
                                          {BookUserIndividualRenewprintData &&
                                            BookUserIndividualRenewprintData.map(
                                              (rowchild, index) => (
                                                <tr>
                                                  <>
                                                    {rowchild.BOOKRENT_ID ==
                                                      row.BOOKRENT_ID && (
                                                      <>
                                                        <td>
                                                          {
                                                            rowchild.REQUEST_DATE
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            rowchild.PRE_RELEASE_DATE
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            rowchild.NEW_RELEASE_DATE
                                                          }
                                                        </td>
                                                        <td>
                                                          {rowchild.STATUS == 0
                                                            ? "Pending"
                                                            : rowchild.STATUS ==
                                                              1
                                                            ? "Accept"
                                                            : "Declined"}
                                                        </td>
                                                        <td>
                                                          {rowchild.REMARK3
                                                            ? rowchild.REMARK3
                                                            : "..."}
                                                        </td>
                                                      </>
                                                    )}
                                                  </>
                                                </tr>
                                              )
                                            )}
                                        </tbody>
                                      </table>
                                    </td>
                                    <td>
                                      {" "}
                                      {row.STATUS !== "Release"
                                        ? timeCount(row.RELEASE_DATE)
                                        : "..."}
                                    </td>
                                    <td>
                                      {row.STATUS !== "Release" ? (
                                        <span class="delayTimeAnimated">
                                          {extratimeCount(row.RELEASE_DATE)}
                                        </span>
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
                                        <p>{row.STATUS_1}</p>
                                      )}
                                    </td>
                                    <td>{row.REMARK1}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* book report individual status list end */}
                  {/* printing functionality end */}{" "}
                </>
              )}
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
