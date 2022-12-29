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
import swal from "sweetalert";

import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
import { useReactToPrint } from "react-to-print";

const BookRequestPending = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();

  const [BooksData, setBooksData] = useState([]);
  const [BookPendingRequestData, setBookPendingRequestData] = useState([]);
  const [Employee_BookPreviousRecord, setEmployee_BookPreviousRecord] =
    useState([]);
  const [RequestStatus, setRequestStatus] = useState("");

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
    document.title = "Book Pending Request";

    getPendingBookRequest();
  }, []);
  //print function
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getPendingBookRequest
  const getPendingBookRequest = async () => {
    axios.get(`${BaseUrl}/library/view/getbookPendingRequest`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setBookPendingRequestData(res.data.data);
    });
  };

  const RequestReply = async (emp_id, id) => {
    console.log(id);
    await axios
      .get(`${BaseUrl}/library/view/getemployee_previous_bookRecord/${emp_id}`)
      .then((res) => {
        reset1();
        setEmployee_BookPreviousRecord(res.data.data);
        const result = BookPendingRequestData.filter((data) => data.ID == id);
        setUpdateDataFound(result[0]);
        console.log(result[0]);
      });
  };
  const onSubmitUpdate = async (data) => {
    console.log(RequestStatus);
    const data1 = {
      book_id: UpdateDataFound.BOOK_ID,
      emp_id: UpdateDataFound.EMP_ID,
      request_date: UpdateDataFound.REQUEST_DATE,
      declined: data.declined_cause,
      request_status: RequestStatus,
      id: UpdateDataFound.ID,
    };
    const updateResult = await axios
      .put(`${BaseUrl}/library/update/sentrequest_reply/${data1.emp_id}`, data1)
      .then((response) => {
        if (response.data.success) {
          getPendingBookRequest();
          swal({
            title: "Request Reply Successfully!",
            icon: "success",
            button: "Ok!",
          });
          reset1({
            request_status: "",
          });
          setRequestStatus("");
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
      });

    // console.log(UpdateDataFound);
  };

  //search
  const SearchData = (e) => {
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getPendingBookRequest();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(
          `${BaseUrl}/library/search/Bookrequest_pending_admin/${searchby_lowercase}`
        )
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);
          setBookPendingRequestData(response.data.data);
          //setPublisherData(response.data.data);
        })
        .catch((error) => {});
    }
  };

  //table
  const columns = [
    {
      title: "User",

      render: (row) => (
        <>
          {row.NAME}({row.DESIGNATION})
        </>
      ),
    },

    {
      title: "Requested Date",
      dataIndex: "REQUEST_DATE",
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
          {data.IMAGE ? (
            <img src={`${BaseUrl}/uploadDoc/${data.IMAGE}`} width="70" />
          ) : (
            <img src={`${BaseUrl}/uploadDoc/book.png`} width="70" />
          )}
        </>
      ),
    },
    {
      title: "Volume & Edition",
      dataIndex: "VOLUME_EDITION",
    },
    {
      title: "Number of book copy",
      dataIndex: "NUMBER_OF_COPY",
    },
    {
      title: "Available copy",
      dataIndex: "AVAILABLE_COPY",
    },
    {
      title: "OTP",
      dataIndex: "OTP",
    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <div className="">
            <a
              className="btn btn-primary btn-sm"
              href="#"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                RequestReply(record.EMP_ID, record.ID);
              }}
            >
              <i class="fa fa-mail-reply"></i>
            </a>
          </div>
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
                <button type="button" class="Button_success float-right">
                  Total Pending:{BookPendingRequestData?.length}
                </button>
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
                            BookPendingRequestData?.length > 0
                              ? BookPendingRequestData
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
                          BookPendingRequestData.length > 0
                            ? BookPendingRequestData
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
                        <i className="fa fa-pencil m-r-5" /> Request Decision
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
                        {/* two part start */}
                        <div className="container">
                          <ul class="nav nav-tabs">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#home"
                              >
                                {" "}
                                Previous Record
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#menu1"
                              >
                                Pending Request Reply
                              </a>
                            </li>
                          </ul>

                          <div class="tab-content">
                            <div class="tab-pane container active" id="home">
                              {" "}
                              <button
                                class="btn btn-success float-right clearfix"
                                onClick={handlePrint}
                              >
                                Print
                              </button>
                              <div class="table-responsive" ref={componentRef}>
                                <h5 class="text-center mt-3">
                                  Previous Record
                                </h5>
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>Book Serial Number</th>
                                      <th>Issued Date</th>
                                      <th>Release Date</th>
                                      <th>Receive Date</th>
                                      <th>Status</th>
                                      <th>Remark</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Employee_BookPreviousRecord.length &&
                                      Employee_BookPreviousRecord.map(
                                        (row, index) => (
                                          <tr>
                                            <td>{row.BOOK_ID}</td>
                                            <td>{row.ISSUE_DATE}</td>
                                            <td>{row.RELEASE_DATE}</td>
                                            <td>{row.RECEIVE_DATE}</td>
                                            <td>
                                              {row.STATUS == "Release" ? (
                                                <button class="btn btn-success">
                                                  <i
                                                    className="fa fa-check"
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "white",
                                                    }}
                                                  />
                                                </button>
                                              ) : (
                                                <button class="Button_Danger1">
                                                  {row.STATUS}
                                                </button>
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
                            <div class="tab-pane container fade" id="menu1">
                              <h5>Request Reply</h5>
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
                                    User Name
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
                                    <span style={{ color: "red" }}>*</span> Book
                                    Title
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
                                    <span style={{ color: "red" }}>*</span>{" "}
                                    Author
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
                                    <span style={{ color: "red" }}>*</span>{" "}
                                    Volume & edition
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      class="form-control bba_documents-form-control"
                                      type="text"
                                      placeholder="Volume & Edition"
                                      defaultValue={
                                        UpdateDataFound.VOLUME_EDITION
                                      }
                                      {...register1("volume_edition")}
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
                                    <span style={{ color: "red" }}>*</span>
                                    Select Option
                                  </label>
                                  <div className="col-sm-8">
                                    <select
                                      class="form-select form-control bba_documents-form-control"
                                      {...register1("request_status", {
                                        onChange: (e) =>
                                          setRequestStatus(e.target.value),
                                      })}
                                    >
                                      <option value="">Select decision</option>
                                      <option value="1">Accept</option>
                                      <option value="2">Declined</option>
                                    </select>
                                  </div>
                                </div>
                                {RequestStatus == 2 && (
                                  <>
                                    <div className="mb-1 row">
                                      <label
                                        for="inputtext"
                                        class="col-sm-4 col-form-label"
                                      >
                                        {" "}
                                        <span style={{ color: "red" }}>
                                          *
                                        </span>{" "}
                                        Declined Cause
                                      </label>
                                      <div className="col-sm-8">
                                        <textarea
                                          class="form-control bba_documents-form-control"
                                          {...register1("declined_cause")}
                                        ></textarea>
                                      </div>
                                    </div>
                                  </>
                                )}
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

                        {/* two part end */}
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

export default BookRequestPending;
