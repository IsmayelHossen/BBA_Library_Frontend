import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";

import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";

const BookRentStatus = () => {
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
  const [printData, setprintData] = useState([]);
  const [printOptionView, setprintOptionView] = useState(false);
  const [PublisherData, setPublisherData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [issuedBookReceive, setissuedBookReceive] = useState(false);
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
    getBookRentStatus();
    getPublisher();
    getCategory();
  }, []);
  //print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //getAccetBookRequest
  const getBookRentStatus = async () => {
    axios.get(`${BaseUrl}/library/view/getbookrentstatus`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setBookARentStatusData(res.data.data);
    });
  };
  const getPublisher = () => {
    axios.get(`${BaseUrl}/library/view/getpublisher`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setPublisherData(res.data.data);
    });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getcategory`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setCategoryData(res.data.data);
    });
  };
  //edit publisher

  const ReturnBookissued = async (rentId) => {
    setUpdateId(rentId);
    //console.log(rentId);
    reset1();
    const result = BookARentStatusData.filter((data) => data.ID_2 == rentId);
    setUpdateDataFound(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    var receive_date = data.ReceiveDate;
    var receive_day = receive_date.split("-")[2];
    var receive_month = receive_date.split("-")[1];
    var receive_year = receive_date.split("-")[0];
    var receive_date1 = receive_day + "/" + receive_month + "/" + receive_year;
    const data1 = {
      rentId: UpdateId,
      receive_date: receive_date1,
      remark: data.remark,
      book_id: UpdateDataFound.BOOK_ID,
    };
    setissuedBookReceive(true);
    const Result = await axios
      .put(`${BaseUrl}/library/update/IssuebookReturn/${UpdateId}`, data1)
      .then((response) => {
        if (response.data.success) {
          //sms send when received book
          // const Emp_mobile = 88 + UpdateDataFound.MOBILE;
          const Emp_mobile = 8801952152883;
          const Book_num = UpdateDataFound.BOOK_ID;
          const Old_Book_No = UpdateDataFound.OLD_BOOK_NO_1;
          const Msg_User = `Book  serial number ${Book_num}-Old Book Number(${Old_Book_No}) is Received by Librarian`;
          axios
            .get(
              `https://eservice.bba.gov.bd/api/sms?mobile=${Emp_mobile}&apikey=$2a$12$X3ydCr5No7MfKe2aFNJriuVl5YIXQH3thNA.dD.eD0FOmSf92eP2O&message=${Msg_User}`
            )
            .then((res) => {
              if (res.data.status === "SUCCESS") {
                getBookRentStatus();
                swal({
                  title: "Issued Book Received Successfully!",
                  icon: "success",
                  button: "Ok!",
                });
                reset1();
                setissuedBookReceive(true);
                window.$("#vendor_update").modal("hide");
              }
            });
        }
      });
  };

  //search
  const SearchData = (e) => {
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
          `${BaseUrl}/library/search/bookrentStatus_admin/${searchby_lowercase}`
        )
        .then((res) => {
          //console.log(response.data);
          // console.log(response.data.data);
          setBookARentStatusData(res.data.data);
          //setPublisherData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // Set the date we're counting down to

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
      title: "Designation",
      dataIndex: "DESIGNATION",
    },
    {
      title: "Book Serial Number",
      dataIndex: "BOOK_NUM",
    },
    {
      title: "Book Old Number",
      dataIndex: "OLD_BOOK_NO_1",
    },
    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
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
          {data.IMAGE ? (
            <img src={`${BaseUrl}/uploadDoc/${data.IMAGE}`} width="70" />
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
      render: (data) => <>{data.RECEIVE_DATE ? data.RECEIVE_DATE : "..."}</>,
    },
    {
      title: "Status",
      render: (data) => (
        <>
          {data.STATUS == "Release" ? (
            <p class="btn btn-success btn-sm">
              <i class="fa fa-check" aria-hidden="true"></i>
            </p>
          ) : (
            <p class="Button_Danger1">{data.STATUS}</p>
          )}
        </>
      ),
    },
    {
      title: "Action",
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
                ReturnBookissued(record.ID_2);
              }}
            >
              <i class="fa fa-mail-reply"></i>
            </a>
          )}
        </div>
      ),
    },
    {
      title: "Remark",
      dataIndex: "REMARK1",
    },
  ];

  //print data get
  const GetDataToPrint = async (e) => {
    console.log(e.target.value);
    const FilterType = e.target.value.toLowerCase();

    axios
      .get(`${BaseUrl}/library/view/getdataToPrint/${FilterType}`)
      .then((response) => {
        console.log(response.data.data);
        // setsearchLoader(false);
        setprintData(response.data.data);
        setprintOptionView(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getFilterSearchData = (e) => {
    const FilterType = e.target.value;
    if (FilterType == "") {
      getBookRentStatus();
    } else {
      axios
        .get(`${BaseUrl}/library/search/searchRentDataByFilter/${FilterType}`)
        .then((response) => {
          console.log(response.data.data);
          // setsearchLoader(false);
          setBookARentStatusData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>BOOK RENT STATUS - BBA Library </title>
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
              <div className="row">
                <div class="col-md-8 ">
                  <div class="row">
                    <div class="col-md-8 mb-3">
                      <div className="row">
                        <label for="inputtext" class="col-sm-2 col-form-label">
                          {" "}
                          <button class="btn btn-default"> Filter:</button>
                        </label>
                        <div className="col-sm-10">
                          <select
                            class=" form-select form-control bba_documents-form-control"
                            name="select_type_toPrint"
                            onChange={getFilterSearchData}
                          >
                            <option value="">Select Type</option>
                            <option value="Release">Release</option>
                            <option value="Service on going">
                              Service on going
                            </option>
                            {CategoryData &&
                              CategoryData.map((row) => (
                                <option value={`${row.CATEGORY_NAME}`}>
                                  {row.CATEGORY_NAME}
                                </option>
                              ))}

                            {PublisherData &&
                              PublisherData.map((row) => (
                                <option value={`${row.PUBLISHER_NAME}`}>
                                  {row.PUBLISHER_NAME}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div
                        class=" form-group has-search"
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
                  </div>
                </div>

                <div class="col-md-4 ">
                  <button class="Button_success">Book rent status</button>
                </div>
              </div>
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
                          BookARentStatusData.length > 0
                            ? BookARentStatusData
                            : ""
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
                        Issued book receive
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
                      {issuedBookReceive && (
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
                      <div className="row Product_add form_design">
                        <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Employee
                              Name
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
                                type="text"
                                defaultValue={UpdateDataFound.BOOK_ID}
                                {...register1("serial number")}
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
                              Old Book Number
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                defaultValue={UpdateDataFound.OLD_BOOK_NO_1}
                                {...register1("old_book_no")}
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
                              Status
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                defaultValue={UpdateDataFound.STATUS}
                                {...register1("status")}
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
                              Receiving Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="date"
                                {...register1("ReceiveDate", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              Remark
                            </label>
                            <div className="col-sm-8">
                              <textarea
                                class="form-control bba_documents-form-control"
                                type="text"
                                {...register1("remark", {
                                  required: true,
                                })}
                              ></textarea>
                            </div>
                          </div>
                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Confirm</span>
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
      </div>
    </>
  );
};

export default BookRentStatus;
