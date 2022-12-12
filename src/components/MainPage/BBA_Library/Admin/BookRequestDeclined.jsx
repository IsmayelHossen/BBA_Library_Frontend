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

const BookRequestDeclined = () => {
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
    document.title = "Book Request Declined";
    getDeclinedBookRequest();
  }, []);

  //getPendingBookRequest
  const getDeclinedBookRequest = async () => {
    axios.get(`${BaseUrl}/library/view/geDeclinedBookRequest`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setBookPendingRequestData(res.data.data);
    });
  };

  //edit publisher

  const RequestReply = async (id) => {
    console.log(id);
    await axios
      .get(`${BaseUrl}/library/view/getemployee_previous_bookRecord/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setEmployee_BookPreviousRecord(res.data.data);
        const result = BookPendingRequestData.filter(
          (data) => data.EMP_ID == id
        );
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
    };
    const updateResult = await axios
      .put(`${BaseUrl}/library/update/sentrequest_reply/${data1.emp_id}`, data1)
      .then((response) => {
        if (response.data.success) {
          getDeclinedBookRequest();
          swal({
            title: "Request Reply Successfully!",
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

    // console.log(UpdateDataFound);
  };

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getDeclinedBookRequest();
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
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "User",
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
      title: "Status",
      render: (text, record) => (
        <div className="">
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
        </div>
      ),
    },
    {
      title: "Declined Message",
      dataIndex: "DECLINED_MSG",
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
                  Total Declined:{BookPendingRequestData?.length}
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
                          BookPendingRequestData ? BookPendingRequestData : ""
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
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="active ">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#menu1"
                              >
                                Previous Record
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#menu2"
                              >
                                Reply
                              </a>
                            </li>
                          </ul>
                          {/* Tab panes */}
                          <div className="tab-content">
                            <div
                              id="menu1"
                              className="container tab-pane  fade in active"
                            >
                              <br />
                              <h5>Previous Record</h5>
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th>Book Serial Number</th>
                                    <th>Issued Date</th>
                                    <th>Release Date</th>
                                    <th>Receive Date</th>
                                    <th>Fine</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Employee_BookPreviousRecord &&
                                    Employee_BookPreviousRecord.map(
                                      (row, index) => (
                                        <tr>
                                          <td>{row.BOOK_ID}</td>
                                          <td>{row.ISSUE_DATE}</td>
                                          <td>{row.RELEASE_DATE}</td>
                                          <td>{row.RECEIVE_DATE}</td>
                                          <td>{row.FINE}</td>
                                          <td>{row.STATUS}</td>
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </table>
                            </div>
                            <div id="menu2" className="container tab-pane fade">
                              <br />

                              <h3>Request Reply</h3>
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

export default BookRequestDeclined;
