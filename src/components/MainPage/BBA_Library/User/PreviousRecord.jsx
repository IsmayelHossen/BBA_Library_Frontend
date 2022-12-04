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
import "../../../index.css";
import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const PreviousRecord = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();

  const [BooksData, setBooksData] = useState([]);
  const [BookARentStatusData, setBookARentStatusData] = useState([]);
  const [Employee_BookPreviousRecord, setEmployee_BookPreviousRecord] =
    useState([]);
  const [RequestStatus, setRequestStatus] = useState("");
  const [PrintDataShow, setPrintDataShow] = useState(false);
  const componentRefBookList = useRef();
  const handlePrintBookList = useReactToPrint({
    content: () => componentRefBookList.current,
  });

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

    getBookRentStatus();
  }, []);

  //getAccetBookRequest
  const getBookRentStatus = async () => {
    // const emp_id = 1;
    const emp_id = 21;
    axios
      .get(`${BaseUrl}/library/view/getbookpreviousstatus/${emp_id}`)
      .then((res) => {
        console.log(res.data.data);
        setDataLoader(false);
        setBookARentStatusData(res.data.data);
      });
  };

  //edit publisher

  const ReturnBookssued = async (emp_id, book_id) => {
    console.log(emp_id, book_id);
    const result = BookARentStatusData.filter(
      (data) => data.EMP_ID == emp_id && data.BOOK_ID == book_id
    );
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    var request_date = new Date().toLocaleDateString();
    var request_date_day = request_date.split("/")[1];
    var request_date_month = request_date.split("/")[0];
    var request_date_year = request_date.split("/")[2];
    var request_date1 =
      request_date_day + "/" + request_date_month + "/" + request_date_year;
    var newrelease_date = data.newrelease_date;
    var newrelease_date1 =
      newrelease_date.split("-")[2] +
      "/" +
      newrelease_date.split("-")[1] +
      "/" +
      newrelease_date.split("-")[0];
    const data1 = {
      id: UpdateDataFound.ID_2,
      newrelease_date: newrelease_date1,
      prevous_release_date: UpdateDataFound.RELEASE_DATE,
      request_date: request_date1,
    };
    console.log(data1);
    const Result = await axios
      .post(`${BaseUrl}/library/create/additionalTimeRequest`, data1)
      .then((response) => {
        if (response.data.success) {
          getBookRentStatus();
          swal({
            title: "Sent Book Renew Request!",
            icon: "success",
            button: "Ok!",
          });
          reset1();
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(data);
      });

    console.log(UpdateDataFound);
  };

  //search
  const SearchData = (e) => {
    // const emp_id = 1;
    const emp_id = 21;
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getBookRentStatus();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(
          `${BaseUrl}/library/search/previousRecord_user/${searchby_lowercase}/${emp_id}`
        )
        .then((response) => {
          console.log(response.data);
          setBookARentStatusData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  //time count down

  // Update the count down every 1 second

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

  //table
  const columns = [
    {
      title: "Receiver",
      dataIndex: "NAME",
    },

    {
      title: "Book Serial Number",
      dataIndex: "BOOK_NUM",
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
      render: (data) => (
        <>
          <img src={`${BaseUrl}/uploadDoc/${data.IMAGE}`} width="70" />
        </>
      ),
    },

    {
      title: "Issued Date",
      dataIndex: "ISSUE_DATE",
    },
    {
      title: "Release Date",
      dataIndex: "RELEASE_DATE",
    },
    {
      title: "Time Left",
      render: (text, record) => (
        <div className="">
          <>
            {record.STATUS != "Release"
              ? timeCount(record.RELEASE_DATE)
              : "..."}
          </>
        </div>
      ),
    },
    {
      title: "Time Delay",
      render: (text, record) => (
        <div className="">
          <>
            {record.STATUS != "Release" ? (
              <p class="delayTimeAnimated">
                {extratimeCount(record.RELEASE_DATE)}
              </p>
            ) : (
              "..."
            )}
          </>
        </div>
      ),
    },
    {
      title: "Receive Date",
      dataIndex: "RECEIVE_DATE",
    },
    {
      title: "Status",
      render: (data) => (
        <>
          {data.STATUS == "Release" ? (
            <p class="btn btn-success btn-sm">
              {" "}
              <i class="fa fa-check" aria-hidden="true"></i>
            </p>
          ) : (
            <p class="Button_Danger1 btn-sm">{data.STATUS}</p>
          )}
        </>
      ),
    },
    {
      title: "Remark",
      dataIndex: "REMARK1",
    },
    {
      title: "Process",
      render: (text, record) => (
        <div className="">
          {record.STATUS == "Release" ? (
            <button className="btn btn-success btn-sm" href="#">
              Process Completed
            </button>
          ) : (
            <a
              className="btn btn-primary btn-sm"
              href="#"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                ReturnBookssued(record.EMP_ID, record.BOOK_ID);
              }}
            >
              Renew Book
            </a>
          )}
        </div>
      ),
    },
  ];
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
            <div class="card-header1" style={{ paddingBottom: "3.5em" }}>
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
                  Previous Record Status
                </button>
              </div>
              <button
                onClick={handlePrintBookList}
                class="btn btn-default float-right clearfix"
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
                            BookARentStatusData?.length > 0
                              ? BookARentStatusData
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
                          BookARentStatusData ? BookARentStatusData : ""
                        }
                        rowKey={(record) => record.id}
                        onChange={console.log("chnage")}
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
                        <i className="fa fa-pencil m-r-5" />
                        Book Renew Request
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
                        <form
                          onSubmit={handleSubmit1(onSubmitUpdate)}
                          class="form_design"
                        >
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>
                              Employee Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Book Title"
                                defaultValue={UpdateDataFound.NAME}
                                {...register1("empoyee_name")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Book Title
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Book Title"
                                defaultValue={UpdateDataFound.TITLE}
                                {...register1("title")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Author
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Author"
                                defaultValue={UpdateDataFound.AUTHOR}
                                {...register1("author")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              Book Serial Number
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="number"
                                defaultValue={UpdateDataFound.BOOK_NUM}
                                {...register1("book_num")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              Previous Release Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                defaultValue={UpdateDataFound.RELEASE_DATE}
                                {...register1("prevous_release_date")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              New Release Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="date"
                                placeholder="New Release Date"
                                {...register1("newrelease_date")}
                              />
                            </div>
                          </div>
                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Send</span>
                            </button>
                            <button
                              type="button"
                              class="Button_Danger1"
                              data-dismiss="modal"
                            >
                              <span> Close</span>
                            </button>
                          </div>
                        </form>
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
          <div style={{ display: "none" }}>
            <table ref={componentRefBookList} class="ReportTable">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Book Serial Number</th>
                  <th>Category Name</th>
                  <th>Place & Publisher</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Cover Photo</th>
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
                {BookARentStatusData &&
                  BookARentStatusData.map((row) => (
                    <tr>
                      <td>{row.NAME}</td>
                      <td>{row.BOOK_NUM}</td>
                      <td>{row.CATEGORY_NAME}</td>
                      <td>{row.PUBLISHER_NAME}</td>
                      <td>{row.TITLE}</td>
                      <td>{row.AUTHOR}</td>
                      <td>
                        <img
                          src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                          width="50"
                        />
                      </td>
                      <td>{row.ISSUE_DATE}</td>
                      <td>{row.RELEASE_DATE}</td>
                      <td>
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
                            {" "}
                            <i class="fa fa-check" aria-hidden="true"></i>
                          </p>
                        ) : (
                          <p class="">{row.STATUS}</p>
                        )}
                      </td>
                      <td>{row.REMARK1}</td>
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

export default PreviousRecord;
