import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";

import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import useAuth from "../../../initialpage/hooks/useAuth";
// import useAuth from "../../BBA_Library/useAuth";

const UserBookRenew = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState([]);
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();

  const [BooksData, setBooksData] = useState([]);
  const [BookARentStatusData, setBookARentStatusData] = useState([]);
  const [Employee_BookPreviousRecord, setEmployee_BookPreviousRecord] =
    useState([]);
  const [RequestStatus, setRequestStatus] = useState("");
  const [PrintDataShow, setPrintDataShow] = useState(false);
  const [BookARenewStatusData, setBookARenewStatusData] = useState([]);
  const [BookARenewRepeatStatusData, setBookARenewRepeatStatusData] = useState(
    []
  );
  const componentRefBookList = useRef();
  const handlePrintBookList = useReactToPrint({
    content: () => componentRefBookList.current,
  });

  const { user } = useAuth();
  const employeeId = user ? user.employe_id : 0;
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
  useEffect(() => {
    document.title = "Book Rent Status";

    getBookRenewStatus();
  }, []);

  //getAccetBookRequest

  const getBookRenewStatus = async () => {
    // const emp_id = 1;

    axios
      .get(`${BaseUrl}/library/view/getbookrenewstatus/${employeeId}`)
      .then((res) => {
        console.log(res.data.data);
        setDataLoader(false);
        setBookARenewRepeatStatusData(res.data.data);
        const unique = [
          ...new Map(res.data.data.map((m) => [m.BOOKRENT_ID, m])).values(),
        ];
        setBookARenewStatusData(unique);
      });
  };

  const VeiwRenewStatus = (rentId) => {
    console.log(rentId);
    const result = BookARenewRepeatStatusData.filter(
      (data) => data.ID_3 == rentId
    );
    setUpdateDataFound(result);
    console.log(result);
  };
  //search
  const SearchData = (e) => {
    const emp_id = employeeId;
    setsearchdata(e.target.value);
    const search = e.target.value.replace(/'/gi, "''");
    if (search == "") {
      getBookRenewStatus();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(
          `${BaseUrl}/library/search/bookrenewstatus_user/${searchby_lowercase}/${emp_id}`
        )
        .then((response) => {
          console.log(response.data);
          const unique = [
            ...new Map(
              response.data.data.map((m) => [m.BOOKRENT_ID, m])
            ).values(),
          ];
          setBookARenewStatusData(unique);
          console.log(unique);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const columns = [
    {
      title: "Book Serial Number",
      dataIndex: "BOOK_NUM",
    },
    {
      title: "Old Book Number",
      dataIndex: "OLD_BOOK_NO_1",
    },
    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
    },
    {
      title: "Place & Publisher",
      dataIndex: "PUBLISHER_NAME",
    },

    {
      title: "Title",
      dataIndex: "TITLE",
    },
    {
      title: "Author",
      dataIndex: "AUTHOR",
    },
    {
      title: "Covor Photo",
      render: (row) => (
        <>
          {row.IMAGE ? (
            <img src={`${BaseUrl}/uploadDoc/${row.IMAGE}`} width="70" />
          ) : (
            <img src={`${BaseUrl}/uploadDoc/book.png`} width="70" />
          )}
        </>
      ),
    },

    {
      title: "Issued Date",
      dataIndex: "ISSUE_DATE",
    },

    {
      title: "View",
      render: (data) => (
        <>
          <a
            class="btn btn-success btn-sm"
            data-toggle="modal"
            data-target="#vendor_update"
            onClick={() => {
              VeiwRenewStatus(data.ID_3);
            }}
          >
            <i class="fa fa-eye" aria-hidden="true"></i>
          </a>
        </>
      ),
    },
  ];
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
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <style type="text/css" media="print">
            {
              " @media print{body{background:#fff;zoom:80%}.has-search,.printBtn{display:none}.table_caption_when_print th{border:none}@page{size:landscape;margin:.3cm}::-webkit-scrollbar{display:none}.ReportTable{font-family:arial,sans-serif;border-collapse:collapse;width:100%;}.ReportTable td,.ReportTable th{border:1px solid #ddd;text-align:left;padding:3px}.Userbookrenewprint{background:red!important;}}  "
            }
          </style>
          {/* Page Header */}
          <div class="">
            <div class="card-header1" style={{ paddingBottom: "4.5em" }}>
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
                <button type="button" class="Button_success float-right">
                  Book Renew Status
                </button>
              </div>
              <button
                onClick={handlePrintBookList}
                class="btn btn-success mt-3 float-right clearfix"
              >
                Print
              </button>
            </div>
            <div class="card-body1">
              {/* table start */}
              <div className="row">
                <div className="col-md-12">
                  {DataLoader && (
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
                  {!DataLoader && (
                    <div
                      className="table-responsive vendor_table_box"
                      style={{ whiteSpace: "normal" }}
                    >
                      <Table
                        className="table-striped"
                        pagination={{
                          total:
                            BookARenewStatusData?.length > 0
                              ? BookARenewStatusData
                              : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={
                          BookARenewStatusData.length > 0
                            ? BookARenewStatusData
                            : ""
                        }
                        rowKey={(record) => record.id}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content modal-content_docs">
                    <div class="modal-header">
                      <h6
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{
                          fontWeight: "600",
                          color: "#5265ac",
                          fontSize: "15px",
                        }}
                      >
                        <i className="fa fa-veiw m-r-5" />
                        Book Renew Status
                        {UpdateDataFound.length &&
                          UpdateDataFound.slice(0, 1).map((row, index) => (
                            <>
                              (SN-{row.BOOK_NUM}(OLD SN-
                              {row.OLD_BOOK_NO_1}))
                            </>
                          ))}
                        {/*UpdateDataFound.id*/}
                      </h6>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-body ">
                      <div className="row Product_add form_design">
                        <table>
                          <thead>
                            <tr>
                              <th>Previous Date</th>
                              <th>New Release Date</th>
                              <th>Status</th>
                              <th>Comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {UpdateDataFound.length &&
                              UpdateDataFound.map((row, index) => (
                                <tr>
                                  <td>{row.PRE_RELEASE_DATE}</td>
                                  <td>{row.NEW_RELEASE_DATE}</td>
                                  <td>
                                    {row.STATUS == 1 ? (
                                      <button className="btn btn-success btn-sm">
                                        <i
                                          className="fa fa-check"
                                          style={{
                                            fontSize: "20px",
                                            color: "white",
                                          }}
                                        />
                                      </button>
                                    ) : row.STATUS == 0 ? (
                                      <button className="btn text-danger btn-sm">
                                        Pending
                                      </button>
                                    ) : (
                                      <button className="btn btn-danger btn-sm">
                                        <i
                                          style={{
                                            fontSize: "20px",
                                            color: "white",
                                          }}
                                          class="fa fa-times"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    )}
                                  </td>
                                  <td>
                                    {row.REMARK3 == null
                                      ? "....."
                                      : row.REMARK3}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}

        <>
          <div class="Userbookrenewprint" style={{ display: "none" }}>
            <table class="ReportTable" ref={componentRefBookList}>
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

                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {BookARenewStatusData.length &&
                  BookARenewStatusData.map((row, index) => (
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

                      <td>{row.PAGE_NUMBER ? row.PAGE_NUMBER : "..."}</td>
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
                            {BookARenewRepeatStatusData &&
                              BookARenewRepeatStatusData.map(
                                (rowchild, index) => (
                                  <tr>
                                    <>
                                      {rowchild.BOOKRENT_ID ==
                                        row.BOOKRENT_ID && (
                                        <>
                                          <td>{rowchild.REQUEST_DATE}</td>
                                          <td>{rowchild.PRE_RELEASE_DATE}</td>
                                          <td>{rowchild.NEW_RELEASE_DATE}</td>
                                          <td>
                                            {rowchild.STATUS == 0 ? (
                                              "Pending"
                                            ) : rowchild.STATUS == 1 ? (
                                              <p class="btn btn-success btn-sm">
                                                <i
                                                  class="fa fa-check"
                                                  aria-hidden="true"
                                                ></i>
                                              </p>
                                            ) : (
                                              "Declined"
                                            )}
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

                      <td>
                        {row.STATUS == "Release" ? (
                          <p class="btn btn-success btn-sm">
                            <i class="fa fa-check" aria-hidden="true"></i>
                          </p>
                        ) : (
                          <p>{row.STATUS_1}</p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      </div>
    </>
  );
};

export default UserBookRenew;
